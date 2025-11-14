# VIKS Production Portfolio Site

This branch is configured for environments that reject binary blobs in Git history. Any attempt to add PNG, JPG, or other binary assets will fail with an error similar to `Binary files are not supported`, and the branch update will be rejected.

## Fixing the "Binary files are not supported" error

1. **Remove the offending asset** from your commit: run `git status` to locate new binary files, then `git rm` them before recommitting.
2. **Use text-based alternatives** instead of uploading binaries. Two easy approaches:
   - Embed the logo as a data URI (`data:image/png;base64,...`) directly in the markup or CSS.
   - Host the logo on a CDN (for example, an image hosting service) and reference it by URL so nothing binary lives in the repository.
3. **Force a clean commit history** if a binary already landed in a previous commit. Use `git reset --soft HEAD^` (or `git rebase -i`) to drop the commit that introduced the file, then recommit without the binary asset.

> ℹ️ The site now ships with the official VIKS Production SVG logo baked in, so the correct mark renders out of the box. To use your own PNG (or any other bitmap) without committing a binary file, convert the image to a Base64 data URI and paste it into `logo-config.js` as explained in the comments at the top of that file.
>
> Prefer to work with raw SVG markup? Drop the `<svg>...</svg>` code into `window.VIKS_LOGO_INLINE_SVG` inside `logo-config.js` and it will be encoded automatically at runtime—no manual conversion required.

## Configuring Telegram form delivery

The contact form sends submissions straight to Telegram. To receive those messages:

1. Open `contact-config.js` and paste the chat ID where you want to receive alerts into `window.VIKS_TELEGRAM_CHAT_ID`.
   - This must be the ID of a user, group, or channel that has already started a conversation with your bot.
   - Using the bot’s own ID will trigger the Telegram error `Forbidden: bot can't send messages to bots`.
2. If you regenerate the bot token, drop the new value into `window.VIKS_TELEGRAM_BOT_TOKEN` in the same file.
3. Reload the page and submit the form—successful deliveries will show “Message sent successfully!”

Need help finding your chat ID? Send any message to your bot, then visit `https://api.telegram.org/bot<token>/getUpdates` and look for the `chat` → `id` field in the response.

## Development

All assets are plain HTML, CSS, and JavaScript:

```bash
git clone <repo>
cd viksvideo
# open index.html in your preferred static server or browser
```
