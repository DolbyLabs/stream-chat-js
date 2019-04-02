import { StreamChat } from 'stream-chat';

const apiKey = 'apiKey';
const apiSecret = 'apiSecret';

const client = new StreamChat(apiKey, null, { timeout: 3000 }); // $ExpectType StreamChat

const devToken = client.devToken('joshua'); // $ExpectType string
const userToken = client.createToken('james', 3600); // $ExpectType string
const authType = client.getAuthType(); // $ExpectType string

client.setBaseURL('https://chat-us-east-1.stream-io-api.com/'); // $ExpectType void
client.updateAppSettings({}); // $ExpectType Promise<object>
const currentSettings = client.getAppSettings(); // $ExpectType Promise<object>
client.disconnect(); // $ExpectType void

client.setUser({ id: 'john', phone: 2 }, devToken); // $ExpectType void
client.setAnonymousUser(); // $ExpectType void
client.setGuestUser({ id: 'steven' }); // $ExpectType Promise<void>

client.get('https://chat-us-east-1.stream-io-api.com/', { id: 2 }); // $ExpectType Promise<APIResponse>
client.put('https://chat-us-east-1.stream-io-api.com/', { id: 2 }); // $ExpectType Promise<APIRespone>
client.post('https://chat-us-east-1.stream-io-api.com/', { id: 2 }); // $ExpectType Promise<APIResponse>
client.delete('https://chat-us-east-1.stream-io-api.com/', { id: 2 }); // $ExpectType Promise<APIResponse>

client.sendFile('aa', 'bb', 'text.jpg', 'image/jpg', 'james'); // $ExpectType Promise<APIResponse>

const event = {
  cid: 'channelid',
  type: 'user.updated',
  message: { text: 'Heloo' },
  reaction: { type: 'like' },
  member: { id: 'john' },
  user: { id: 'john' },
  me: { id: 'john' },
  unread_count: 3,
  online: 10,
};
client.dispatchEvent(event); // $ExpectType void
client.handleEvent(event); // $ExpectType void
client.recoverState(); // $ExpectType void

const channel = client.channel('messaging', 'channelName', { color: 'green' }); // $ExpectType Channel
