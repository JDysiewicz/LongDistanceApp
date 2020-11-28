export interface User {
  id: number
  google_id: string
  family_name: string
  given_name: string
  partner_code: string
  has_partner: string
  sent_request: null | string
  has_request: null | string
  nickname: string
  avatar: string | null
}

export interface Message {
  id: number
  message: string
  sender_partner_code: string
  recipient_partner_code: string
  time_sent: string
}
