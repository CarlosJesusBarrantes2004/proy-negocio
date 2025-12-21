import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    // Convertimos FormData a un objeto simple
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center p-8 text-center duration-300">
        <CheckCircle2 className="text-primary mb-4 h-12 w-12" />
        <h3 className="text-foreground text-xl font-bold">¡Mensaje enviado!</h3>
        <p className="text-muted-foreground mt-2">
          Nos pondremos en contacto pronto.
        </p>
        <Button
          variant="outline"
          className="mt-6 hover:cursor-pointer"
          onClick={() => setStatus("idle")}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          name="nombre"
          placeholder="Nombre completo"
          required
          className="bg-background/50 text-foreground"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email corporativo"
          required
          className="bg-background/50 text-foreground"
        />
      </div>
      <Textarea
        name="mensaje"
        placeholder="Cuéntanos sobre tu idea..."
        required
        className="bg-background/50 text-foreground min-h-[120px]"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full gap-2 hover:cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Enviar Mensaje"
        )}
      </Button>
    </form>
  );
}
