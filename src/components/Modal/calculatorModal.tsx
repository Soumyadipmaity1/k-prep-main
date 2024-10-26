import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import { denkOne } from '@/app/font';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    yearPath?: string;
}

const CalculatorModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;

    const navigateToCalculator = (type: 'sgpa' | 'cgpa') => {
        router.push(`/cse-notes/calculator/${type}`);
        onClose();
    };

    return createPortal(
        <div className={denkOne.className}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
                <div className="bg-[#f8e9f4] w-[380px] sm:w-auto rounded-lg p-8 text-center relative z-[101]">
                    <button
                        title="Close"
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                    >
                        <FaTimes size={24} />
                    </button>
                    <p className="mb-8 text-scheme p-5 text-3xl">Please select your calculator.</p>
                    <div className='flex justify-evenly gap-4'>
                        <div className='bg-[#fbd6ff] bg-schemeA rounded-lg border-2 border-[#843ab1] hover:shadow-lg transition-shadow'>
                            <button
                                onClick={() => navigateToCalculator('sgpa')}
                                className="text-schemeB px-8 py-4 transition hover:opacity-80"
                            >
                                SGPA Calculator
                            </button>
                        </div>
                        <div className='bg-[#fbd6ff] bg-schemeA rounded-lg border-2 border-[#843ab1] hover:shadow-lg transition-shadow'>
                            <button
                                onClick={() => navigateToCalculator('cgpa')}
                                className="text-schemeB px-8 py-4 transition hover:opacity-80"
                            >
                                CGPA Calculator
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CalculatorModal;
