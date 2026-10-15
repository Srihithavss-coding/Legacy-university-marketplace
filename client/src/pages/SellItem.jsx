import React, { useEffect, useState } from 'react'
import { assets, categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { CONDITIONS, GEAR_TYPES, LAB_SIZES } from '../utils/listing';

const fieldClass = "outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40";

const SellItem = () => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [campus, setCampus] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [edition, setEdition] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [semester, setSemester] = useState('');
    const [professor, setProfessor] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [size, setSize] = useState('');
    const [department, setDepartment] = useState('');
    const [bicycleBrand, setBicycleBrand] = useState('');
    const [gearType, setGearType] = useState('');
    const [lockIncluded, setLockIncluded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [userListings, setUserListings] = useState([]);

    const {axios, fetchProducts, user, navigate, setShowUserLogin} = useAppContext()

    useEffect(() => {
        if (!user) {
            setShowUserLogin(true);
            return;
        }
        if (user?.campus) setCampus(user.campus)
        fetchUserListings();
    }, [user, navigate, setShowUserLogin])

    const fetchUserListings = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                const myListings = data.products.filter(p => {
                    const sellerId = typeof p.sellerId === 'object' ? p.sellerId._id : p.sellerId;
                    return sellerId === user._id;
                });
                setUserListings(myListings);
            }
        } catch (error) {
            console.error('Error fetching user listings:', error);
        }
    }

    const deleteListing = async (listingId) => {
        if (!confirm('Are you sure you want to delete this listing?')) return;

        try {
            const { data } = await axios.delete(`/api/product/delete/${listingId}`);
            if (data.success) {
                toast.success('Listing deleted successfully');
                fetchUserListings();
                fetchProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const resetForm = () => {
        setName('');
        setDescription('');
        setCategory('');
        setCampus(user?.campus || '');
        setCondition('');
        setPrice('');
        setAuthor('');
        setEdition('');
        setCourseCode('');
        setSemester('');
        setProfessor('');
        setAcademicYear('');
        setSize('');
        setDepartment('');
        setBicycleBrand('');
        setGearType('');
        setLockIncluded(false);
        setFiles([]);
    }

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            if (submitting) return;

            if (!category) {
                toast.error('Please select a category');
                return;
            }
            if (!condition) {
                toast.error('Please select item condition');
                return;
            }
            if (!campus.trim()) {
                toast.error('Campus / hostel name is required');
                return;
            }
            if (!files.filter(Boolean).length) {
                toast.error('Please upload at least one image');
                return;
            }

            setSubmitting(true);

            const productData = {
                name,
                description: description.split('\n'),
                category,
                campus: campus.trim(),
                condition,
                price,
                sellerId: user._id,
                author,
                edition,
                courseCode,
                semester,
                professor,
                academicYear,
                size,
                department,
                bicycleBrand,
                gearType,
                lockIncluded,
            }

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                if (files[i]) formData.append('images', files[i])
            }

            const {data} = await axios.post('/api/product/add', formData)

            if (data.success){
                toast.success(data.message);
                resetForm();
                fetchProducts();
                fetchUserListings();
                navigate('/products');
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setSubmitting(false);
        }

      }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Item Images</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="relative">

                                <input onChange={(e)=>{
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                type="file" id={`image${index}`} hidden accept="image/*" />

                                <div className="relative group">
                                    <img className="max-w-24 cursor-pointer border border-gray-300 rounded" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                                    {files[index] && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const updatedFiles = [...files];
                                                updatedFiles[index] = null;
                                                setFiles(updatedFiles);
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="item-name">Listing Title</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name}
                     id="item-name" type="text" placeholder="e.g. CS101 Data Structures textbook" className={fieldClass} required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="item-description">Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} value={description}
                     id="item-description" rows={4} className={`${fieldClass} resize-none`} placeholder="Condition notes, pickup details, etc."></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category}
                    id="category" className={fieldClass} required>
                        <option value="">Select Category</option>
                        {categories.map((item, index)=>(
                            <option key={index} value={item.path}>{item.text}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="campus">Campus / Hostel Name</label>
                    <input onChange={(e)=> setCampus(e.target.value)} value={campus}
                     id="campus" type="text" placeholder="e.g. North Campus, Hostel B" className={fieldClass} required />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="condition">Condition</label>
                    <select onChange={(e)=> setCondition(e.target.value)} value={condition}
                    id="condition" className={fieldClass} required>
                        <option value="">Select Condition</option>
                        {CONDITIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                {category === 'Textbooks' && (
                    <div className="space-y-4 border border-primary/20 bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">Textbook details</p>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="author">Author</label>
                            <input id="author" value={author} onChange={(e)=> setAuthor(e.target.value)} className={fieldClass} placeholder="Author name" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="edition">Edition</label>
                            <input id="edition" value={edition} onChange={(e)=> setEdition(e.target.value)} className={fieldClass} placeholder="e.g. 3rd" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="courseCode">Course Code</label>
                            <input id="courseCode" value={courseCode} onChange={(e)=> setCourseCode(e.target.value)} className={fieldClass} placeholder="e.g. CS101" required />
                        </div>
                    </div>
                )}

                {category === 'Notes' && (
                    <div className="space-y-4 border border-primary/20 bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">Notes / question paper details</p>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="semester">Semester</label>
                            <input id="semester" value={semester} onChange={(e)=> setSemester(e.target.value)} className={fieldClass} placeholder="e.g. Sem 4" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="professor">Professor</label>
                            <input id="professor" value={professor} onChange={(e)=> setProfessor(e.target.value)} className={fieldClass} placeholder="Instructor name" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="academicYear">Academic Year</label>
                            <input id="academicYear" value={academicYear} onChange={(e)=> setAcademicYear(e.target.value)} className={fieldClass} placeholder="e.g. 2024-25" required />
                        </div>
                    </div>
                )}

                {category === 'Lab' && (
                    <div className="space-y-4 border border-primary/20 bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">Lab coat / equipment details</p>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="size">Size</label>
                            <select id="size" value={size} onChange={(e)=> setSize(e.target.value)} className={fieldClass} required>
                                <option value="">Select size</option>
                                {LAB_SIZES.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="department">Department</label>
                            <input id="department" value={department} onChange={(e)=> setDepartment(e.target.value)} className={fieldClass} placeholder="e.g. Chemistry" required />
                        </div>
                    </div>
                )}

                {category === 'Bicycles' && (
                    <div className="space-y-4 border border-primary/20 bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">Bicycle details</p>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="bicycleBrand">Brand</label>
                            <input id="bicycleBrand" value={bicycleBrand} onChange={(e)=> setBicycleBrand(e.target.value)} className={fieldClass} placeholder="e.g. Hero, Giant" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="gearType">Gear type</label>
                            <select id="gearType" value={gearType} onChange={(e)=> setGearType(e.target.value)} className={fieldClass} required>
                                <option value="">Select gear type</option>
                                {GEAR_TYPES.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={lockIncluded} onChange={(e)=> setLockIncluded(e.target.checked)} />
                            <span>Lock included</span>
                        </label>
                    </div>
                )}

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="item-price">Price (₹)</label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price}
                         id="item-price" type="number" placeholder="0" className={fieldClass} required />
                    </div>
                </div>
                <button disabled={submitting} className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    {submitting ? (
                        <>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Listing Item...
                        </>
                    ) : (
                        'List Item'
                    )}
                </button>
            </form>

            {/* My Active Listings Section */}
            {userListings.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-medium mb-4">My Active Listings</h3>
                    <div className="space-y-3">
                        {userListings.map((listing) => (
                            <div key={listing._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img src={listing.image[0]} alt={listing.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-medium text-gray-800">{listing.name}</p>
                                        <p className="text-sm text-gray-500">₹{listing.price} · {listing.category}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteListing(listing._id)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
  )
}

export default SellItem
