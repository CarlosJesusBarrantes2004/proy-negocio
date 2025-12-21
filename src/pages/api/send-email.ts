export const prerender = false;

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "carlos2004jbs2307@gmail.com",
        pass: "rojlaapbdebzmbpv",
      },
    });

    await transporter.sendMail({
      from: "carlos2004jbs2307@gmail.com",
      to: "carlos2004jbs2307@gmail.com",
      replyTo: email,
      subject: `🚀 Nuevo prospecto: ${nombre}`,
      text: `Has recibido un mensaje de: ${nombre} (${email})\n\nMensaje:\n${mensaje}`,
    });

    return new Response(JSON.stringify({ message: "¡Éxito!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error interno" }), {
      status: 500,
    });
  }
};
