import { AxiosError } from 'axios'
import React, { useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signInTodo } from '../../api/auth'
import Form from '../../components/Form'
import Input from '../../components/Input'
import useInputs from '../../hooks/useInputs'
import validation from '../../utils/validation'

function SignIn() {
  const {
    values: { email, password },
    handleChange
  } = useInputs({ email: '', password: '' })

  const navigate = useNavigate()

  const onClickLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await signInTodo(email, password)
        const token = res.data.access_token
        localStorage.setItem('token', token)
        return navigate('/todo')
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert(`[${error.response?.status}] ${error.message || '로그인 실패'}`)
        } else {
          throw new Error(error as string)
        }
      }
    },
    [navigate]
  )

  return (
    <main>
      <Form name="로그인">
        <div>
          <Input
            id="email"
            testid="email-input"
            type="email"
            name="email"
            placeholder="email 입력시 @ 포함시켜주세요"
            value={email}
            onChange={handleChange}
            labelText="Your email"
          />
        </div>
        <div>
          <Input
            id="password"
            testid="password-input"
            name="password"
            type="password"
            placeholder="비밀번호를 8자리이상 입력"
            value={password}
            onChange={handleChange}
            labelText="Password"
          />
        </div>
        <button
          type="button"
          disabled={!validation(email, password)}
          data-testid="signin-button"
          className={
            validation(email, password)
              ? 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              : 'w-full text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          }
          onClick={() => onClickLogin(email, password)}
        >
          로그인
        </button>
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            회원가입이 필요하세요? &nbsp;
            <Link
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              to="/signup"
            >
              회원가입
            </Link>
          </p>
        </div>
        <div>
          <Link
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            to="/"
          >
            홈으로
          </Link>
        </div>
      </Form>
    </main>
  )
}

export default SignIn
