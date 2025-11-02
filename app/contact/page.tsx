"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // TODO: Implement API endpoint to handle contact form submission
      console.log("Contact form submitted:", values);
      toast.success("Thank you for your message! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Contact Us</h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-black/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className="w-full px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                placeholder="What is this regarding?"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message")}
                className="w-full px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40 transform hover:scale-[1.02] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
