const MedicineCard = ({ medicine }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition">
      <div className="h-32 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-bold">
        Medicine Image
      </div>
      <h3 className="mt-4 text-lg font-semibold">{medicine.name}</h3>
      <p className="text-sm text-gray-500">{medicine.type}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-green-600 font-bold text-lg">₹{medicine.price}</span>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
          Add
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;