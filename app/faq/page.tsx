// app/faq/page.tsx
"use client"; // Client component for interactivity (scroll-to-top)

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MessageCircle, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show scroll-to-top button after scrolling down
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Got questions about shopping on Rolu? We've got answers.
        </p>
      </div>

      {/* Main FAQ Accordion */}
      <Card className="mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Common Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Rolu?</AccordionTrigger>
              <AccordionContent>
                Rolu is an online shopping platform offering premium clothing, accessories, electronics, and more. We focus on quality products, fast delivery across Ghana, and a smooth shopping experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                • Accra & Tema: 1–2 business days  
                • Other regions in Ghana: 2–5 business days  
                Delivery times may vary during peak periods (holidays, sales). We’ll always give you an estimated delivery date at checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We currently accept:  
                • Mobile Money (MTN, Vodafone, AirtelTigo)  
                • Visa & Mastercard (via Stripe)  
                • Cash on Delivery (select areas only)  
                More options coming soon!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I return or exchange items?</AccordionTrigger>
              <AccordionContent>
                Yes! You have 7 days to return or exchange most items if they’re unused and in original packaging.  
                Contact us within 7 days of delivery to start the process. Return shipping is free for faulty/wrong items.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                After your order ships, you’ll receive a tracking number via email and SMS.  
                You can also check status anytime in your account under “My Orders”.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Do you ship outside Ghana?</AccordionTrigger>
              <AccordionContent>
                Not yet! We currently deliver only within Ghana.  
                We’re working on international shipping options — stay tuned!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>I forgot my password — what do I do?</AccordionTrigger>
              <AccordionContent>
                Click “Forgot password?” on the sign-in page.  
                We’ll send you a reset link. Check your spam/junk folder if it doesn’t arrive within 5 minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Is my payment information safe?</AccordionTrigger>
              <AccordionContent>
                Yes! We use Stripe, a PCI-compliant payment processor.  
                We never store your full card details on our servers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card className="bg-muted/40 border-0 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Still have questions?</CardTitle>
          <p className="text-muted-foreground">
            We're here to help — reach out anytime.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 justify-center items-center text-center">
          <div className="space-y-2 hover:scale-105 transition-transform">
            <Phone className="h-10 w-10 mx-auto text-green-500" />
            <p className="font-medium">Call us</p>
            <p className="text-sm text-muted-foreground">+233 509 419 901</p>
          </div>

          <div className="space-y-2 hover:scale-105 transition-transform">
            <Mail className="h-10 w-10 mx-auto text-blue-500" />
            <p className="font-medium">Email us</p>
            <p className="text-sm text-muted-foreground">support@rolu.com</p>
          </div>

          <div className="space-y-2 hover:scale-105 transition-transform">
            <MessageCircle className="h-10 w-10 mx-auto text-purple-500" />
            <p className="font-medium">WhatsApp</p>
            <a
              href="https://wa.me/233509419901"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 mt-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Chat Now
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Back to shopping */}
      <div className="text-center mt-12">
  <Button 
    variant="solid" 
    size="sm" 
    className="bg-orange-400 text-white hover:bg-orange-600"
  >
    <Link href="/products">Back to Shopping</Link>
  </Button>
</div>

      {/* Scroll-to-top button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}