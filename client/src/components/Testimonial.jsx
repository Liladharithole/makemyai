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

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-[40px] font-bold">
          Customer Testimonials
        </h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[696px]">
          Hear what our users say about us. We're always looking for ways to
          improve. If you have a positive experience with us, leave a review.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow max-w-xs"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Star key={index} filled={testimonial.rating > index} />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
