import { Controller, Get, Res, Header } from '@nestjs/common';
import { Response } from 'express';

@Controller('referrals')
export class ReferralController {

  @Get('get-referral-code')
  @Header('Content-Type', 'text/html')
  getReferralCodePage(@Res() res: Response): void {
   
    const localStorageKey = 'pending_referral_code_tnb'; 
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body>
          <script>
              const referralCode = localStorage.getItem('${localStorageKey}');
              
              if (window.ReactNativeWebView) {
                  // Comunica el código a la aplicación nativa
                  window.ReactNativeWebView.postMessage('referralCode:' + (referralCode || 'NOT_FOUND'));
              }
              
              // Limpiar localStorage después de enviarlo para uso único
              if (referralCode) {
                localStorage.removeItem('${localStorageKey}');
              }
              
              document.body.innerHTML = '<h1>Transferencia completada.</h1>';
          </script>
      </body>
      </html>
    `;
    res.send(htmlContent);
  }

}