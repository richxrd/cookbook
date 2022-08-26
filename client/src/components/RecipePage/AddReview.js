import React, { useState } from "react";

const DEFAULT = {
    review: "",
    rate: 5,
};

const AddReview = () => {
    const [form, setForm] = useState(DEFAULT);

    const resetForm = () => {
        setForm(DEFAULT);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(form);
        resetForm();
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form
            className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0"
            onSubmit={submitHandler}
        >
            <textarea
                className="w-full border-[#96ceb4] focus:outline-none focus:border-green-800 focus:ring-0"
                rows="4"
                wrap="soft"
                required
                value={form.review}
                onChange={handleChange}
                name="review"
                placeholder="Enter Review"
            />

            <div className="flex items-center justify-between md:flex-col md:w-72">
                <div className="flex items-center space-x-4 justify-between">
                    <p>Select Rating:</p>
                    <select
                        required
                        value={form.rate}
                        onChange={handleChange}
                        name="rate"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>

                <button className="py-2 px-4 bg-[#96ceb4] rounded-sm hover:bg-green-200 transition duration-150">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AddReview;
