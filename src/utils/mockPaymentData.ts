
export interface GoogleAccount {
  email: string;
  name: string;
  cards: Array<{
    type: string;
    lastFour: string;
  }>;
}

export const mockGoogleAccounts: GoogleAccount[] = [
  {
    email: 'tmna2002@gmail.com',
    name: 'Nhat Anh Tran Minh',
    cards: [
      { type: 'Mastercard', lastFour: '0000' },
      { type: 'Visa', lastFour: '4242' }
    ]
  },
  {
    email: 'user@example.com',
    name: 'Example User',
    cards: [
      { type: 'Visa', lastFour: '1234' }
    ]
  }
];
