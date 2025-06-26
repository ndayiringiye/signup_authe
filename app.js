        const form = document.getElementById('signupForm');
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmError = document.getElementById('confirmError');

        const strengthText = document.getElementById('strengthText');
        const strengthFill = document.getElementById('strengthFill');

        function validateName() {
            const name = fullName.value.trim();
            if (name.length < 2) {
                showError(nameError, 'Name must be at least 2 characters long');
                return false;
            }
            hideError(nameError);
            return true;
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(emailError, 'Please enter a valid email address');
                return false;
            }
            hideError(emailError);
            return true;
        }

        function validatePassword() {
            const pwd = password.value;
            if (pwd.length < 8) {
                showError(passwordError, 'Password must be at least 8 characters long');
                return false;
            }
            hideError(passwordError);
            return true;
        }

        function validateConfirmPassword() {
            if (password.value !== confirmPassword.value) {
                showError(confirmError, 'Passwords do not match');
                return false;
            }
            hideError(confirmError);
            return true;
        }

        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }

        function hideError(element) {
            element.style.display = 'none';
        }

        function checkPasswordStrength(pwd) {
            let strength = 0;
            let strengthLabel = '';

            if (pwd.length >= 8) strength++;
            if (/[a-z]/.test(pwd)) strength++;
            if (/[A-Z]/.test(pwd)) strength++;
            if (/[0-9]/.test(pwd)) strength++;
            if (/[^A-Za-z0-9]/.test(pwd)) strength++;

            switch (strength) {
                case 0:
                case 1:
                case 2:
                    strengthLabel = 'Weak';
                    strengthFill.className = 'strength-fill strength-weak';
                    strengthFill.style.width = '33%';
                    break;
                case 3:
                case 4:
                    strengthLabel = 'Medium';
                    strengthFill.className = 'strength-fill strength-medium';
                    strengthFill.style.width = '66%';
                    break;
                case 5:
                    strengthLabel = 'Strong';
                    strengthFill.className = 'strength-fill strength-strong';
                    strengthFill.style.width = '100%';
                    break;
            }

            strengthText.textContent = `Password strength: ${strengthLabel}`;
        }

        fullName.addEventListener('blur', validateName);
        email.addEventListener('blur', validateEmail);
        password.addEventListener('input', function() {
            checkPasswordStrength(this.value);
            if (confirmPassword.value) {
                validateConfirmPassword();
            }
        });
        password.addEventListener('blur', validatePassword);
        confirmPassword.addEventListener('blur', validateConfirmPassword);

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmValid = validateConfirmPassword();
            const isTermsAccepted = terms.checked;

            if (!isTermsAccepted) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }

            if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Creating Account...';

                setTimeout(() => {
                    successMessage.style.display = 'block';
                    form.style.display = 'none';
                    
                    console.log('Form submitted successfully!', {
                        fullName: fullName.value,
                        email: email.value,
                        password: password.value
                    });
                }, 1500);
            }
        });

        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = '#28a745';
                } else if (this.value.length > 0) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#e1e1e1';
                }
            });
        });