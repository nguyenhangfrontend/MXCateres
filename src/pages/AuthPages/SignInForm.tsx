import { useState } from 'react';
// import { Link } from 'react-router';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import Label from '@components/form/Label';
import Input from '@components/form/input/InputField';
// import Checkbox from '@components/form/input/Checkbox';
import Button from '@components/ui/button/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/api-request/Auth.api';
import { setCookieLocal } from '@/utils/auth';
import { loginFormType } from './types';

export default function SignInForm() {
  const [loginError, setErrorLogin] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<loginFormType>({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  // console.log('errors', errors);
  // console.log(watch('email'));
  const onLogin: SubmitHandler<loginFormType> = async (values) => {
    setLoading(true);
    const result: any = await login(values);
    console.log('result', result);
    setLoading(false);
    const status = result.data?.success ? 'success' : 'error';

    if (status === 'success') {
      setCookieLocal('token', result?.data?.data.token);
      localStorage.setItem('currentUser', JSON.stringify(result?.data?.user));
      navigate('/');
    } else {
      const message = result.error?.data?.message || 'Login fail';
      setErrorLogin(message);
    }
  };
  // const [isChecked, setIsChecked] = useState(false);
  return (
    <div className='flex flex-col flex-1'>
      <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
        <div>
          <div className='mb-5 sm:mb-8'>
            <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
              Sign In
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Enter your email and password to sign in!</p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className='space-y-6'>
                <div>
                  <div className='pt-[10px]'>
                    <Controller
                      name='email'
                      control={control}
                      rules={{
                        required: 'Email is required',
                        // pattern: {
                        //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        //   message: 'Invalid email format',
                        // },
                        minLength: {
                          value: 3,
                          message: 'Email must be at least 3 characters',
                        },
                        maxLength: { value: 50, message: 'Email must be at most 20 characters' },
                      }}
                      render={({ field }) => (
                        <Input
                          className='pt-[10px]'
                          {...field}
                          label='Email'
                          placeholder='info@gmail.com'
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </div>

                  <div className='pt-[15px]'>
                    <Controller
                      name='password'
                      control={control}
                      rules={{
                        required: 'Password is required',
                        minLength: { value: 5, message: 'Password must be at least 5 characters' },
                        maxLength: { value: 50, message: 'Password must be at most 50 characters' },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label='Password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <Button className='w-full' size='sm' type='submit'>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            {/* <div className='mt-5'>
              <p className='text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start'>
                Don&apos;t have an account? {''}
                <Link to='/signup' className='text-brand-500 hover:text-brand-600 dark:text-brand-400'>
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
