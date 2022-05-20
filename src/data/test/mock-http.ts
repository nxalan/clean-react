import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols/http'
import faker from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue({ one: 1, two: 2, three: 3 })
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.helpers.objectValue({ one: 1, two: 2, three: 3 })
})

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise <HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
