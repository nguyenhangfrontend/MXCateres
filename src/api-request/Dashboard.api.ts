import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQuery';
export const firmwareApi = createApi({
  reducerPath: 'firmwareApi',
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ['firmwares'],
  endpoints: (builder) => ({
    getFirmwareList: builder.query<any, any>({
      query: (data) => {
        return `/firmwares?order=${data.order || 'DESC'}&page=${
          data.page
        }&take=${data.size}&name=${data.name || ''}&id=${data.id || ''}`;
      },
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
    }),
    getFirmwareSchedules: builder.query<any, any>({
      query: (data) => `/firmwares/schedulers?orer="ASC"&page=${data.page}&take=${data.size}`,
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
      providesTags: ['firmwares'],
    }),

    getFirmwareScheduleDetail: builder.query<any, any>({
      query: (id) => `/firmwares/schedulers/${id}`,
      keepUnusedDataFor: 1,
    }),
    getFirmwareShortList: builder.query<any, any>({
      query: (deviceType) => `/firmwares/short?deviceType=${deviceType}`,
      keepUnusedDataFor: 1,
    }),
    getGroupShort: builder.query<any, any>({
      query: (keyword) => `/groups/short?page=1&take=9999&keyword=${keyword}`,
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getDeviceShort: builder.query<any, any>({
      query: (data) => `/devices/short?deviceType=${data.deviceType}&keyword=${data.keyword}&page=1&take=9999`,
      keepUnusedDataFor: 1,
      transformResponse: (response) => {
        return response;
      },
    }),

    createFirmwareSchedule: builder.mutation({
      query: (data) => ({
        url: `/firmwares/schedulers`,
        method: 'POST',
        body: data,
        formData: true,
      }),

      invalidatesTags: ['firmwares'],
    }),

    downloadFirmwareSchedule: builder.mutation({
      query: (id) => ({
        url: `/firmwares/schedulers/${id}/download`,
        method: 'GET',
        responseHandler: async (response) => {
          return await saveResponseUsingHiddenElement(response);
        },
        cache: 'no-cache',
      }),
    }),
    cancleFirmwareSchedule: builder.mutation({
      query: (id) => ({
        url: `/firmwares/schedulers/${id}/cancel`,
        method: 'GET',
        cache: 'no-cache',
      }),
    }),

    postFirmwareUpload: builder.mutation({
      query: (data) => {
        return {
          url: `/firmwares`,
          method: 'POST',
          body: data,
          formData: true,
        };
      },
    }),
    postStoreFirmwareFile: builder.mutation({
      query: (data) => {
        return {
          url: `/firmwares/upload`,
          method: 'POST',
          body: data,
          formData: true,
        };
      },
    }),
    deleteFirmwareUpload: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/firmwares/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useLazyGetFirmwareListQuery,
  useLazyGetFirmwareScheduleDetailQuery,
  useLazyGetFirmwareShortListQuery,
  useLazyGetFirmwareSchedulesQuery,
  useLazyGetGroupShortQuery,
  useLazyGetDeviceShortQuery,
  useCreateFirmwareScheduleMutation,
  usePostFirmwareUploadMutation,
  useDeleteFirmwareUploadMutation,
  useDownloadFirmwareScheduleMutation,
  useCancleFirmwareScheduleMutation,
  usePostStoreFirmwareFileMutation,
  endpoints,
} = firmwareApi;

const saveResponseUsingHiddenElement = async (response: Response) => {
  const blob = await response.blob();
  // Create a temporary download link
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = 'firmware.csv';
  // Trigger the download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
