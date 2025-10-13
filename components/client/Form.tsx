'use client';

import { useState, useEffect } from 'react';

interface FormData {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  category: string;
}

const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    timestamp: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    category: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setFormData(prev => ({ ...prev, timestamp: new Date().toISOString() }));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && !showThankYou) {
        e.preventDefault();
        handleEnterPress();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, formData, selectedServices, showThankYou]);

  useEffect(() => {
    if (showThankYou && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = '/';
    }
  }, [showThankYou, countdown]);

  const handleEnterPress = () => {
    switch (currentQuestion) {
      case 1:
        if (formData.name.trim()) {
          validateAndProceed(1);
        } else {
          showError(1, 'Please enter your name');
        }
        break;
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(formData.email.trim())) {
          validateAndProceed(2);
        } else {
          showError(2, 'Please enter a valid email address');
        }
        break;
      case 3:
        if (formData.phone.trim()) {
          validateAndProceed(3);
        } else {
          showError(3, 'Please enter your phone number');
        }
        break;
      case 4:
        if (selectedServices.length > 0) {
          validateAndProceed(4);
        } else {
          showError(4, 'Please select at least one service');
        }
        break;
      case 5:
        if (formData.category !== '') {
          handleSubmit();
        } else {
          showError(5, 'Please select a category');
        }
        break;
    }
  };

  const validateAndProceed = (questionNum: number) => {
    let isValid = true;
    let errorMsg = '';

    switch (questionNum) {
      case 1:
        if (!formData.name.trim()) {
          isValid = false;
          errorMsg = 'Please enter your name';
        }
        break;
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          isValid = false;
          errorMsg = 'Please enter a valid email address';
        }
        break;
      case 3:
        const phoneValue = formData.phone.trim();
        if (!phoneValue) {
          isValid = false;
          errorMsg = 'Please enter your phone number';
        } else if (!/^\d{10}$/.test(phoneValue)) {
          isValid = false;
          errorMsg = 'Phone number must be exactly 10 digits and contain only numbers';
        }
        break;
      case 4:
        if (selectedServices.length === 0) {
          isValid = false;
          errorMsg = 'Please select at least one service';
        }
        break;
    }

    if (isValid) {
      setErrors(prev => ({ ...prev, [questionNum]: '' }));
      setCurrentQuestion(questionNum + 1);
    } else {
      showError(questionNum, errorMsg);
    }
  };

  const showError = (questionNum: number, message: string) => {
    setErrors(prev => ({ ...prev, [questionNum]: message }));
  };

  const toggleService = (value: string) => {
    setSelectedServices(prev => {
      const newServices = prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value];
      
      setFormData(prevData => ({
        ...prevData,
        service: newServices.join(', ')
      }));
      
      return newServices;
    });
    setErrors(prev => ({ ...prev, 4: '' }));
  };

  const handleSubmit = async () => {
    if (formData.category === '') {
      showError(5, 'Please select a category');
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('timestamp', new Date().toISOString());
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('service', formData.service);
    formDataToSend.append('category', formData.category);

    try {
      await fetch('https://script.google.com/macros/s/AKfycby_-WXohq88Pq_83VfU8BTDjOcCZnASGRWcEpu954o6psL2aSeNQHQnQaYRK6GGsBClWg/exec', {
        method: 'POST',
        body: formDataToSend
      });
      setShowThankYou(true);
    } catch (error) {
      console.error('Error:', error);
      showError(5, 'There was an error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: 'branding', label: 'Branding' },
    { value: 'website-development', label: 'Website Development' },
    { value: 'mobile-app-development', label: 'Mobile App Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'brand-photoshoots', label: 'Brand Photoshoots' },
    { value: 'social-media-marketing', label: 'Social Media Marketing' }
  ];

  const categories = [
    'Products', 'Services', 'E-Brands', 'Events', 
    'Media', 'Private Label', 'Celebrity', 'Corporate', 'Other'
  ];

  const progress = showThankYou ? 100 : ((currentQuestion - 1) / 5) * 100;

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-5 md:p-10 font-sans text-white relative overflow-y-auto">
      <div className="w-full max-w-[700px]">
        {/* Question 1: Name */}
        {currentQuestion === 1 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              What is your name?*
            </h2>
            <div className="relative mb-10">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
                autoFocus
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[1] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[1]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(1)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 2: Email */}
        {currentQuestion === 2 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(1)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              What's your email address?
            </h2>
            <div className="relative mb-10">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
                autoFocus
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[2] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[2]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(2)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 3: Phone */}
        {currentQuestion === 3 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(2)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              What's your phone number?
            </h2>
            <div className="relative mb-10">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
                autoFocus
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[3] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[3]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(3)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 4: Services */}
        {currentQuestion === 4 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(3)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              What service do you require?
            </h2>
            <div className="mb-8">
              <div className="mb-3 text-white/80 text-base">
                Select multiple services (click to select)
              </div>
              <div className="flex flex-col gap-2">
                {services.map((service) => (
                  <div
                    key={service.value}
                    onClick={() => toggleService(service.value)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedServices.includes(service.value)
                        ? 'bg-white/20'
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded mr-3 transition-all relative ${
                        selectedServices.includes(service.value)
                          ? 'bg-white border-white'
                          : 'border-white/50'
                      }`}>
                        {selectedServices.includes(service.value) && (
                          <div className="absolute left-[6px] top-[2px] w-[5px] h-[10px] border-black border-r-2 border-b-2 transform rotate-45" />
                        )}
                      </div>
                      <div className="text-lg">{service.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors[4] && (
                <div className="text-red-400 text-sm mt-1.5">
                  {errors[4]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(4)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Question 5: Category */}
        {currentQuestion === 5 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(4)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              What category does your business fall under?
            </h2>
            <div className="relative mb-10">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all appearance-none cursor-pointer"
                autoFocus
              >
                <option value="" disabled className="bg-[#1a1a1a] text-white">
                  Select a category...
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()} className="bg-[#1a1a1a] text-white">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {errors[5] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5">
                  {errors[5]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'OK'}
              </button>
            </div>
          </div>
        )}

        {/* Thank You */}
        {showThankYou && (
          <div className="text-center opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="text-6xl mb-8">🎉</div>
            <h2 className="text-[42px] font-semibold mb-5 tracking-tight">
              Thank you!
            </h2>
            <p className="text-[22px] text-white/80 mb-10">
              We'll be in touch with you shortly.
            </p>
            <p className="text-[#999] text-sm">
              Redirecting to home page in <span>{countdown}</span> seconds...
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        .input-line {
          width: 0;
        }
        input:focus ~ .input-line,
        select:focus ~ .input-line {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Form;