import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToastContainer from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import Dashboard from './components/Dashboard';
import AddEditForm from './components/AddEditForm';
import ViewScreen from './components/ViewScreen';
import { useTestPlans } from './hooks/useTestPlans';
import { useToast } from './hooks/useToast';

export default function App() {
  const { testPlans, addPlan, updatePlan, deletePlan, getPlanById } = useTestPlans();
  const { toasts, showToast } = useToast();
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const handleSave = useCallback((formData, id = null) => {
    if (id) {
      updatePlan(id, formData);
      showToast('Test Suite Updated Successfully');
    } else {
      addPlan(formData);
      showToast('Test Suite Saved Successfully');
    }
    navigate('/');
  }, [addPlan, updatePlan, showToast, navigate]);

  const handleDeleteRequest = useCallback((id) => {
    setModal({
      title: 'Delete Test Suite',
      message: 'Are you sure you want to delete this test suite? This action cannot be undone.',
      onConfirm: () => {
        deletePlan(id);
        showToast('Test Suite Deleted', 'info');
        setModal(null);
      },
    });
  }, [deletePlan, showToast]);

  return (
    <div id="app" className="h-full w-full overflow-auto text-slate-700 min-h-screen">
      <Navbar />
      <ToastContainer toasts={toasts} />

      {modal && (
        <ConfirmModal
          title={modal.title}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Dashboard testPlans={testPlans} onDelete={handleDeleteRequest} />} />
          <Route path="/add" element={<AddEditForm isEditing={false} onSave={(data) => handleSave(data)} onCancel={() => navigate('/')} />} />
          <Route path="/edit/:id" element={<EditRoute getPlanById={getPlanById} onSave={handleSave} onCancel={() => navigate('/')} />} />
          <Route path="/view/:id" element={<ViewRoute getPlanById={getPlanById} onExportSuccess={() => showToast('Export Completed')} />} />
        </Routes>
      </main>
    </div>
  );
}

// Helper components for ID-based routes
function EditRoute({ getPlanById, onSave, onCancel }) {
  const { id } = useParams();
  const plan = getPlanById(id);
  if (!plan) return <div className="text-center py-20 text-slate-500 font-bold">Plan not found.</div>;
  return <AddEditForm plan={plan} isEditing={true} onSave={(data) => onSave(data, id)} onCancel={onCancel} />;
}

function ViewRoute({ getPlanById, onExportSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = getPlanById(id);
  if (!plan) return <div className="text-center py-20 text-slate-500 font-bold">Plan not found.</div>;
  return <ViewScreen plan={plan} onBack={() => navigate('/')} onEdit={(id) => navigate(`/edit/${id}`)} onExportSuccess={onExportSuccess} />;
}
