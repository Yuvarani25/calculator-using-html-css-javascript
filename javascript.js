
        document.addEventListener('DOMContentLoaded', function () {
            const display = document.getElementById('result');
            let currentInput = '';
            let previousInput = '';
            let operator = '';
            let shouldResetDisplay = false;

            function updateDisplay(value) {
                display.textContent = value || '0';
            }

            function calculate() {
                if (currentInput === '' || previousInput === '') return;

                let result;
                try {
                    // Evaluate the expression using a safe approach
                    result = Function(`return ${previousInput} ${operator} ${currentInput}`)();
                    if (result === Infinity || isNaN(result)) {
                        result = 'Error';
                    }
                } catch (e) {
                    result = 'Error';
                }

                updateDisplay(result);
                previousInput = result === 'Error' ? '' : result;
                currentInput = '';
                operator = '';
            }

            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', function () {
                    const value = this.textContent;

                    if (value === 'C') {
                        // Clear the display and reset state
                        currentInput = '';
                        previousInput = '';
                        operator = '';
                        updateDisplay('0');
                        shouldResetDisplay = false;
                    } else if (value === '=') {
                        // Perform calculation
                        calculate();
                        shouldResetDisplay = true;
                    } else if (['+', '-', '*', '/'].includes(value)) {
                        // Handle operator button
                        if (currentInput === '' && operator !== '') {
                            operator = value;
                            return;
                        }

                        if (previousInput !== '') {
                            calculate(); // Calculate previous operation if exists
                        }

                        operator = value;
                        previousInput = currentInput;
                        currentInput = '';
                        shouldResetDisplay = false;
                    } else {
                        // Handle number and decimal point button
                        if (shouldResetDisplay) {
                            currentInput = value;
                            shouldResetDisplay = false;
                        } else {
                            if (value === '.' && currentInput.includes('.')) return; // Prevent multiple dots
                            currentInput += value;
                        }
                        updateDisplay(currentInput);
                    }
                });
            });
        });
