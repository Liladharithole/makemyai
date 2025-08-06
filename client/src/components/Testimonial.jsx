// Star component for rating display
const Star = ({ filled }) => (
  <svg
    className="w-4 h-4 text-yellow-400"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
    />
  </svg>
);

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Patel",
      address: "Mumbai, Maharashtra",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review:
        "MakeMyAI has transformed how we handle data analysis at our firm. The automation features save us dozens of hours every week, and the accuracy is remarkable. Truly a game-changer for Indian businesses!",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      address: "Delhi NCR",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 4,
      review:
        "We've been using MakeMyAI for three months now, and it's made our workflow so much more efficient. The customer support team is responsive and the regular updates keep getting better!",
    },
    {
      id: 3,
      name: "Ananya Reddy",
      address: "Hyderabad, Telangana",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      review:
        "As a startup founder, MakeMyAI has been instrumental in our growth. The predictive analytics feature helped us identify new market opportunities we hadn't considered before. Worth every rupee!",
    },
    {
      id: 4,
      name: "Arjun Kapoor",
      address: "Bangalore, Karnataka",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      review:
        "The integration of MakeMyAI with our existing systems was seamless. The team provided excellent support during setup, and now we can't imagine our operations without it. Highly recommended for tech companies!",
    },
    {
      id: 5,
      name: "Meera Iyer",
      address: "Chennai, Tamil Nadu",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      review:
        "We evaluated several AI solutions before choosing MakeMyAI. The decision was easy once we saw how well it handles regional language processing, which is crucial for our customer base in South India.",
    },
  ];

  // Duplicate testimonials for continuous scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-12 sm:py-16 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-10 sm:mb-14">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Hear from businesses and individuals who have transformed their
              workflow with our AI tools.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-10 mt-16 mx-4 sm:mx-10 sm:mb-14 overflow-hidden border-[var(--color-primary)] border-2 border-dashed">
          {/* First row */}
          <div className="relative mb-8 overflow-visible">
            <div className="flex space-x-4 sm:space-x-6 animate-scroll-left">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-[280px] sm:w-96"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - scrolls in opposite direction */}
          <div className="relative overflow-visible">
            <div className="flex space-x-4 sm:space-x-6 animate-scroll-right">
              {[...testimonials].reverse().map((testimonial, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-[280px] sm:w-96"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
              {[...testimonials].map((testimonial, index) => (
                <div
                  key={`row2-${index + testimonials.length}`}
                  className="flex-shrink-0 w-[280px] sm:w-96"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Extracted Testimonial Card component for better readability
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
    <div className="flex items-start gap-4">
      <img
        className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full object-cover"
        src={testimonial.image}
        alt={testimonial.name}
        width={56}
        height={56}
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
          {testimonial.name}
        </h3>
        <p className="text-sm text-gray-500">{testimonial.address}</p>
      </div>
    </div>

    <div className="flex items-center gap-1 mt-3 sm:mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={testimonial.rating >= star} />
      ))}
    </div>

    <blockquote className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600">
      <p className="line-clamp-4">"{testimonial.review}"</p>
    </blockquote>
  </div>
);

export default Testimonial;
