import React, { useEffect, useState } from 'react';

const correctPassword = 'Oybek';

function App() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    setLoading(true); // Show loader immediately

    setTimeout(() => {
      if (password === correctPassword) {
        setShow(true);
        setErrorMessage('');
        setPassword('');
      } else {
        setErrorMessage('Incorrect password. Please try again.');
      }
      setLoading(false); // Hide loader after 2 seconds and API response
    }, 2000);
  };

  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 5000); // Delay of 2 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [show]);

  return (
    <main className='relative flex flex-col items-center justify-center h-screen'>

      {show &&
        <div className='absolute p-4 px-8 mx-auto font-medium text-white bg-green-500 rounded-md top-10 text-md'>
          <p className='mb-1 text-lg font-semibold'>Saytga kirishga ruxsat berildi</p>
          <p className='text-gray-700'>Navigate qilib navigate("/home"); page ga redirect qilib yuborsak boladi lekin react-routerni qoshishga erindim.</p>
        </div>
      }

      <form onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        if (password !== '') {
          handleSubmit()
        }
      }} className='p-6 rounded-md bg-gray-100 border min-w-[400px]'>
        <h1 className='mb-10 text-2xl font-semibold'>Saytga kirish uchun parolni kiriting!</h1>

        <p className='mb-2 font-medium text-neutral-500 text-md'>Enter your password</p>
        <input
          disabled={loading}
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage('')
          }}
          placeholder="Password"
          className='w-full p-4 font-medium rounded-md outline-none disabled:bg-neutral-300 disabled:cursor-not-allowed'
        />
        {errorMessage && <p className='mt-2 text-sm text-red-500'>{errorMessage}</p>}
        <button
          disabled={loading}
          type='submit'
          className='flex flex-row items-center justify-center w-full p-4 mt-4 text-lg text-white rounded-md disabled:cursor-not-allowed flex-nowrap disabled:bg-neutral-300 bg-neutral-600 hover:bg-neutral-700'
        >
          {loading && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 animate-spin ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          )}
          Submit
        </button>
      </form>
    </main>
  )
}

export default App
