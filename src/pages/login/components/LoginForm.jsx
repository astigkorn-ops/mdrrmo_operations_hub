import React, { useState } from 'react';
import { useAuth } from '../../../components/ui/AuthenticationWrapper';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    admin: { email: 'admin@mdrrmo.gov.ph', password: 'Admin123!' },
    coordinator: { email: 'coordinator@mdrrmo.gov.ph', password: 'Coord123!' },
    officer: { email: 'officer@mdrrmo.gov.ph', password: 'Officer123!' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check against mock credentials
    const isValidCredentials = Object.values(mockCredentials)?.some(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (!isValidCredentials) {
      setErrors({
        general: `Invalid credentials. Use: admin@mdrrmo.gov.ph / Admin123! or coordinator@mdrrmo.gov.ph / Coord123! or officer@mdrrmo.gov.ph / Officer123!`
      });
      return;
    }

    try {
      const result = await login(formData);
      if (result?.success) {
        window.location.href = '/main-dashboard';
      } else {
        setErrors({ general: result?.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact your system administrator at admin@mdrrmo.gov.ph for password recovery.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your government email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={loading}
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={loading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
            disabled={loading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={loading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          disabled={loading}
          iconName="LogIn"
          iconPosition="left"
          className="h-12"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Demo Credentials Info */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>Admin:</strong> admin@mdrrmo.gov.ph / Admin123!</p>
                <p><strong>Coordinator:</strong> coordinator@mdrrmo.gov.ph / Coord123!</p>
                <p><strong>Officer:</strong> officer@mdrrmo.gov.ph / Officer123!</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;