import { missing, mediaBase, send } from './_lib.js';
export default function handler(req, res) {
  send(res, 200, { app: 'MaroqAndQuiz', cloud: true, missing: missing(), mediaBase: mediaBase() });
}
