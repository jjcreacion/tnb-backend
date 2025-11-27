import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

let expo = new Expo();

@Injectable()
export class NotificationsService {
  async sendPushNotification(
    tokens: string[],
    title: string,
    body: string,
    data: any = {},
  ): Promise<void> {
    
    if (tokens.length === 0) {
      console.log('No active tokens to send notifications.');
      return;
    }

    let messages: ExpoPushMessage[] = [];
    
    for (const token of tokens) {
      if (!Expo.isExpoPushToken(token)) {
        continue;
      }

      messages.push({
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: data,
        priority: 'high',
      });
    }

    let chunks = expo.chunkPushNotifications(messages);
    
    for (let chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
        
      } catch (error) {
        console.error('Error sending notification chunk:', error);
      }
    }
  }
}