const categories = [
  "Tablet",
  "Syrup",
  "Capsule",
  "Pain Relief",
  "Diabetes",
  "Heart Care",
];

const CategorySection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-2xl px-4 py-5 text-center font-medium hover:shadow-md transition"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;