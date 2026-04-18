<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Новая заявка — Дом на Утёсе</title>
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; background: #EEE4D3; color: #1E1E1E; margin: 0; padding: 40px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto; background: #F5EEDF; border: 1px solid #C4BFAF;">
        <tr>
            <td style="padding: 40px 40px 24px 40px; border-bottom: 1px solid #C4BFAF;">
                <div style="font-family: 'Arial', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #802F1D; margin-bottom: 16px;">
                    Новая заявка
                </div>
                <div style="font-size: 28px; font-style: italic; line-height: 1.2; color: #1E1E1E;">
                    Дом на Утёсе
                </div>
                <div style="font-size: 13px; color: #5a5a5a; margin-top: 8px;">
                    {{ $sourceLabel }}@if($lotId) · Лот №{{ $lotId }}@endif
                </div>
            </td>
        </tr>

        <tr>
            <td style="padding: 32px 40px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5D9C3; vertical-align: top;">
                            <div style="font-family: 'Arial', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px;">
                                Имя
                            </div>
                            <div style="font-size: 17px; color: #1E1E1E;">{{ $name }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5D9C3; vertical-align: top;">
                            <div style="font-family: 'Arial', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px;">
                                Телефон
                            </div>
                            <div style="font-size: 17px; color: #1E1E1E;">
                                <a href="tel:{{ $phone }}" style="color: #802F1D; text-decoration: none;">{{ $phone }}</a>
                            </div>
                        </td>
                    </tr>
                    @if($email)
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5D9C3; vertical-align: top;">
                            <div style="font-family: 'Arial', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px;">
                                Email
                            </div>
                            <div style="font-size: 17px; color: #1E1E1E;">
                                <a href="mailto:{{ $email }}" style="color: #802F1D; text-decoration: none;">{{ $email }}</a>
                            </div>
                        </td>
                    </tr>
                    @endif
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E5D9C3; vertical-align: top;">
                            <div style="font-family: 'Arial', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px;">
                                Связь
                            </div>
                            <div style="font-size: 17px; color: #1E1E1E;">{{ $contactLabel }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; vertical-align: top;">
                            <div style="font-family: 'Arial', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px;">
                                Отправлено
                            </div>
                            <div style="font-size: 15px; color: #5a5a5a;">{{ $timestamp }} (Samara)</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px 40px 32px 40px; border-top: 1px solid #C4BFAF;">
                <div style="font-family: 'Arial', sans-serif; font-size: 11px; letter-spacing: 1px; color: #888;">
                    — dom-na-utese · автоматическое уведомление
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
