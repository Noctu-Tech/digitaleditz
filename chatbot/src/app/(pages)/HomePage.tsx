"use client"
import React from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { Dock } from '@/components/magicui/dock'
import { Button } from '@/components/ui/button'
import { Particles } from '@/components/magicui/particles'
import Link from 'next/link'
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card'
const HomePage = () => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ]

  const socials = [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <ModeToggle />
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
        <Dock className="fixed bottom-5 z-10 left-1/2 transform -translate-x-1/2 backdrop-blur-md shadow-lg">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              variant="ghost"
              className="rounded-lg"
            >
              {section.label}
            </Button>
          ))}
          <div className="border-l border-border h-6" />
          {socials.map((social) => (
            <Button
              key={social.label}
              onClick={() => window.open(social.href, '_blank')}
              variant="ghost"
              className="rounded-lg"
            >
              {social.label}
            </Button>
          ))}
        </Dock>
      </div>
      <section id="home" className="container mx-auto px-4 py-20">
        
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-6xl font-bold tracking-tight">
            Supercharge Your Marketing
            <span className="text-primary"> Analytics & Automation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            All-in-one platform for CRM, analytics, and marketing automation to help you grow your business smarter.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/signin"><Button size="lg">Get Started Free</Button></Link>
            <Button variant="outline" size="lg">Book a Demo</Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Smart Automation</h3>
            <p className="text-muted-foreground">
              Automate repetitive tasks with AI-powered workflows, saving hours of manual work daily.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Predictive Analytics</h3>
            <p className="text-muted-foreground">
              Leverage machine learning to forecast trends and optimize your marketing strategies.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Multi-Channel Marketing</h3>
            <p className="text-muted-foreground">
              Seamlessly integrate and manage campaigns across social media, email, and web platforms.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">A/B Testing</h3>
            <p className="text-muted-foreground">
              Test and optimize your content with advanced A/B testing tools for maximum engagement.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Lead Scoring</h3>
            <p className="text-muted-foreground">
              Identify and prioritize high-value prospects with our intelligent lead scoring system.
            </p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Custom Reports</h3>
            <p className="text-muted-foreground">
              Generate detailed insights with customizable reports and real-time analytics dashboard.
            </p>
          </div>
        </div>
      {/* Pricing section */}
      <section id="pricing" className="container mx-auto px-4 py-20"></section>
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
        {
          title: "Starter",
          price: "$29",
          features: ["Basic Analytics", "5 Automation Workflows", "Email Support", "1 Team Member"],
        },
        {
          title: "Professional",
          price: "$99",
          features: ["Advanced Analytics", "Unlimited Workflows", "Priority Support", "5 Team Members"],
        },
        {
          title: "Enterprise",
          price: "$299",
          features: ["Custom Analytics", "Custom Workflows", "24/7 Support", "Unlimited Team"],
        },
          ].map((plan) => (
        <div key={plan.title} className="flex flex-col p-6 border rounded-xl">
          <h3 className="text-2xl font-bold">{plan.title}</h3>
          <div className="text-4xl font-bold my-4">{plan.price}<span className="text-sm text-muted-foreground">/month</span></div>
          <ul className="space-y-2 mb-6 flex-grow">
            {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <span className="mr-2">✓</span>{feature}
          </li>
            ))}
          </ul>
          <Button className="w-full">{plan.title === "Professional" ? "Get Started" : "Contact Sales"}</Button>
        </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
        {
          name: "Sarah Johnson",
          role: "Marketing Director",
          company: "Tech Corp",
          content: "This platform has transformed our marketing operations. The automation features alone saved us countless hours.",
        },
        {
          name: "Mike Williams",
          role: "CEO",
          company: "StartUp Inc",
          content: "The analytics insights helped us make data-driven decisions that boosted our conversion rates by 150%.",
        },
          ].map((testimonial) => (
        <div key={testimonial.name} className="p-6 border rounded-xl">
          <p className="text-lg mb-4">"{testimonial.content}"</p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10" />
            <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
        </div>
          ))}
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="relative container mx-auto px-4 py-20">
        <Particles 
          className='absolute w-full h-full'
          color="var(--foreground)"

        />
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full p-2 border rounded-md"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            className="w-full p-2 border rounded-md h-32"
            placeholder="Your message"
          />
        </div>
        <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage
