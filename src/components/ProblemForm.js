import React, { useState } from 'react';

const ProblemForm = ({ onSubmit, problemType }) => {
  const getInitialFormData = () => {
    const commonFields = {
      actionTaken: '',
      escalatedTo: '',
      notes: '',
      problemType: problemType
    };

    switch (problemType) {
      case 'General Storage Pallet Full':
        return {
          ...commonFields,
          fillLevel: 80,
          oldPalletId: '',
          newPalletId: '',
          problemSolver: '',
          locationBefore: '',
          locationAfter: ''
        };
      case 'IRS Pallet Full':
        return {
          ...commonFields,
          fillLevel: 80,
          oldPalletId: '',
          newPalletId: '',
          irsPOC: '',
          notificationTime: new Date().toISOString().slice(0, 16),
          responseTime: '',
          problemSolver: '',
          irsArea: ''
        };
      case 'Missing Expiration':
        return {
          ...commonFields,
          sku: '',
          orderId: '',
          expirationDate: '',
          brandManager: '',
          catalogUpdated: false,
          escalatedToAsana: false,
          asanaTaskId: '',
          screenshotUrl: ''
        };
      default:
        return {
          ...commonFields,
          description: ''
        };
    }
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', formData);
    onSubmit(formData);
  };

  const renderFields = () => {
    switch (problemType) {
      case 'General Storage Pallet Full':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fill Level (%)
              </label>
              <input
                type="number"
                name="fillLevel"
                value={formData.fillLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Old Pallet ID
              </label>
              <input
                type="text"
                name="oldPalletId"
                value={formData.oldPalletId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Pallet ID
              </label>
              <input
                type="text"
                name="newPalletId"
                value={formData.newPalletId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Problem Solver
              </label>
              <input
                type="text"
                name="problemSolver"
                value={formData.problemSolver}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location Before
              </label>
              <input
                type="text"
                name="locationBefore"
                value={formData.locationBefore}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location After
              </label>
              <input
                type="text"
                name="locationAfter"
                value={formData.locationAfter}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </>
        );
      case 'IRS Pallet Full':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fill Level (%)
              </label>
              <input
                type="number"
                name="fillLevel"
                value={formData.fillLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Old Pallet ID
              </label>
              <input
                type="text"
                name="oldPalletId"
                value={formData.oldPalletId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Pallet ID
              </label>
              <input
                type="text"
                name="newPalletId"
                value={formData.newPalletId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                IRS POC
              </label>
              <input
                type="text"
                name="irsPOC"
                value={formData.irsPOC}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Notification Time
              </label>
              <input
                type="datetime-local"
                name="notificationTime"
                value={formData.notificationTime}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Response Time
              </label>
              <input
                type="datetime-local"
                name="responseTime"
                value={formData.responseTime}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Problem Solver
              </label>
              <input
                type="text"
                name="problemSolver"
                value={formData.problemSolver}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                IRS Area
              </label>
              <input
                type="text"
                name="irsArea"
                value={formData.irsArea}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </>
        );
      case 'Missing Expiration':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Order ID
              </label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiration Date (MM/YYYY)
              </label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
                pattern="\d{2}/\d{4}"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Brand Manager
              </label>
              <input
                type="text"
                name="brandManager"
                value={formData.brandManager}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="catalogUpdated"
                  checked={formData.catalogUpdated}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm font-bold">Catalog Updated</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="escalatedToAsana"
                  checked={formData.escalatedToAsana}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm font-bold">Escalated to Asana</span>
              </label>
            </div>
            {formData.escalatedToAsana && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Asana Task ID
                </label>
                <input
                  type="text"
                  name="asanaTaskId"
                  value={formData.asanaTaskId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Screenshot URL
              </label>
              <input
                type="text"
                name="screenshotUrl"
                value={formData.screenshotUrl}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">Problem Details: {problemType}</h2>
      
      {renderFields()}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Action Taken
        </label>
        <textarea
          name="actionTaken"
          value={formData.actionTaken}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Escalated To (if applicable)
        </label>
        <input
          type="text"
          name="escalatedTo"
          value={formData.escalatedTo}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="2"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProblemForm; 