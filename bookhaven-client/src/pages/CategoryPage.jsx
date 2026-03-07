const sampleCategories = [
    { id: 1, name: "Fiction", displayOrder: 1 },
    { id: 2, name: "Non-Fiction", displayOrder: 2 },
    { id: 3, name: "Science & Technology", displayOrder: 3 },
    { id: 4, name: "Children's Books", displayOrder: 4 },
]

function CategoryPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Category List</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Category Name
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                Display Order
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {sampleCategories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {category.displayOrder}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryPage
