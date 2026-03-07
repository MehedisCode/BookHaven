import axios from "axios"
import { useEffect, useState } from "react"

async function fetchDate(setCategoryData) {
    const url = "http://localhost:5106/api/Category"
    await axios.get(url)
        .then((response) => {
            setCategoryData(response.data);
            console.log(response.data)
        })
        .catch((err) => console.log("Error Fetching Category date\n", err))
}

function CategoryPage() {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchDate(setCategoryData);
    }, [])

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
                        {categoryData.map((category) => (
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
