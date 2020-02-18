/* eslint-disable @typescript-eslint/camelcase */
import envVar from '@Env'
import { AuthSession } from 'expo'

const { GITHUB } = envVar()
const REDIRECT_URL = AuthSession.getRedirectUrl()
const SCOPES = ['user']
const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const ACCESS_URL = 'https://github.com/login/oauth/access_token'

const authUrl = () => {
  const url = new URL(AUTHORIZE_URL)
  url.searchParams.append('client_id', GITHUB.CLIENT_ID)
  url.searchParams.append('redirect_uri', REDIRECT_URL)
  url.searchParams.append('scope', SCOPES.join(' '))
  return url.href
}

export type GitHuhAccessTokenResponse = {
  access_token: string
  scope: string
  token_type: string
}

const getAccessToken = async (
  code: string
): Promise<GitHuhAccessTokenResponse> => {
  const url = new URL(ACCESS_URL)
  url.searchParams.append('client_id', GITHUB.CLIENT_ID)
  url.searchParams.append('client_secret', GITHUB.CLIENT_SECRET)
  url.searchParams.append('code', code)

  const res = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return res.json()
}

type AuthSessionResult = {
  type: 'cancel' | 'dismiss' | 'locked' | 'error' | 'success'
  errorCode: string | null
  params: {
    [key: string]: string
  }
  url: string
}

export const getGitHubToken = async () => {
  const { type, params } = (await AuthSession.startAsync({
    authUrl: authUrl()
  })) as AuthSessionResult

  if (type !== 'success') {
    return null
  }

  const { access_token } = await getAccessToken(params.code)
  return access_token
}
