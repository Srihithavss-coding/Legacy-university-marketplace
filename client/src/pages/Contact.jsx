import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to an API endpoint
    console.log('Feedback submitted:', formData)
    toast.success('Thank you for your feedback! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-16 pb-16'>
      <h1 className='text-3xl md:text-4xl font-medium mb-6'>Contact Us</h1>

      <div className='grid md:grid-cols-2 gap-10'>
        <div>
          <h2 className='text-xl font-medium mb-4'>Student Support</h2>
          <p className='text-gray-500 mb-6'>
            Need help with buying, selling, or using Legacy? Our student support team is here to assist you.
          </p>

          <div className='space-y-4'>
            <div>
              <h3 className='font-medium text-gray-700'>Email</h3>
              <p className='text-gray-500'>support@legacy.edu</p>
            </div>
            <div>
              <h3 className='font-medium text-gray-700'>Campus Office Hours</h3>
              <p className='text-gray-500'>Monday - Friday: 9:00 AM - 5:00 PM</p>
            </div>
            <div>
              <h3 className='font-medium text-gray-700'>Location</h3>
              <p className='text-gray-500'>Student Center, Room 204</p>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 p-6 rounded-lg'>
          <h2 className='text-xl font-medium mb-4'>Send Us Feedback / Report an Issue</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
                placeholder='Your name'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
                placeholder='your.email@university.edu'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
              <select
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
              >
                <option>General Inquiry</option>
                <option>Buying Help</option>
                <option>Selling Help</option>
                <option>Technical Issue</option>
                <option>Report a Problem</option>
                <option>Safety Concern</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='4'
                className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
                placeholder='How can we help you?'
                required
              ></textarea>
            </div>
            <button type='submit' className='w-full py-3 bg-primary text-white font-medium hover:bg-primary-dull transition cursor-pointer rounded'>
              Send Feedback
            </button>
          </form>
        </div>
      </div>

      <div className='mt-12'>
        <h2 className='text-xl font-medium mb-4'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
          <div className='border border-gray-200 rounded p-4'>
            <h3 className='font-medium text-gray-700 mb-2'>How do I verify my university email?</h3>
            <p className='text-gray-500 text-sm'>
              When you register, use your university email address (.edu, .ac.in, .edu.in). We'll send a verification link to confirm your identity.
            </p>
          </div>
          <div className='border border-gray-200 rounded p-4'>
            <h3 className='font-medium text-gray-700 mb-2'>Is buying on Legacy safe?</h3>
            <p className='text-gray-500 text-sm'>
              All users are verified with university emails. We recommend meeting on campus for transactions and using the messaging system to communicate before meeting.
            </p>
          </div>
          <div className='border border-gray-200 rounded p-4'>
            <h3 className='font-medium text-gray-700 mb-2'>What can I sell on Legacy?</h3>
            <p className='text-gray-500 text-sm'>
              You can sell textbooks, lab coats, notes, bicycles, dorm gear, and other campus-related items. Please see our guidelines for prohibited items.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
