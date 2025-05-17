import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add validation and API call here
    setAgents([...agents, form])
    setForm({ name: '', email: '', mobile: '', password: '' })
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Agent</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mb-8">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile (+91...)"
            value={form.mobile}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
            Add Agent
          </button>
        </form>

        <h3 className="text-lg font-medium mb-2 text-gray-700">Agent List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{agent.name}</td>
                  <td className="py-2 px-4 border">{agent.email}</td>
                  <td className="py-2 px-4 border">{agent.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
