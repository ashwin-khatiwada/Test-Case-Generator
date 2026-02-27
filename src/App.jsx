import { useState, useCallback } from 'react';
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

  const [screen, setScreen] = useState('dashboard');
  const [activeId, setActiveId] = useState(null);
  const [modal, setModal] = useState(null);

  const navigateTo = useCallback((target, id = null) => {
    setScreen(target);
    setActiveId(id);
  }, []);

  const handleSave = useCallback((formData) => {
    if (activeId) {
      updatePlan(activeId, formData);
      showToast('Test Plan Updated Successfully');
    } else {
      addPlan(formData);
      showToast('Test Plan Saved Successfully');
    }
    navigateTo('dashboard');
  }, [activeId, addPlan, updatePlan, showToast, navigateTo]);

  const handleDeleteRequest = useCallback((id) => {
    setModal({
      title: 'Delete Test Plan',
      message: 'Are you sure you want to delete this test plan? This action cannot be undone.',
      onConfirm: () => {
        deletePlan(id);
        showToast('Test Plan Deleted', 'info');
        setModal(null);
      },
    });
  }, [deletePlan, showToast]);

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard testPlans={testPlans} onNavigate={navigateTo} onDelete={handleDeleteRequest} />;
      case 'add':
        return <AddEditForm isEditing={false} onSave={handleSave} onCancel={() => navigateTo('dashboard')} />;
      case 'edit':
        return <AddEditForm plan={getPlanById(activeId)} isEditing={true} onSave={handleSave} onCancel={() => navigateTo('dashboard')} />;
      case 'view':
        return <ViewScreen plan={getPlanById(activeId)} onBack={() => navigateTo('dashboard')} onEdit={(id) => navigateTo('edit', id)} onExportSuccess={() => showToast('Export Completed')} />;
      default:
        return null;
    }
  };

  return (
    <div id="app" className="h-full w-full overflow-auto bg-slate-50 text-slate-700 min-h-screen">
      <Navbar onNavigate={navigateTo} showAddButton={screen === 'dashboard'} />
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
        {renderScreen()}
      </main>
    </div>
  );
}
