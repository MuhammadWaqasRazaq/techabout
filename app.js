// PKHosting VPS Pricing - TechAbout Assessment
// Vanilla JavaScript for progressive enhancement

document.addEventListener('DOMContentLoaded', function() {
    const pricingData = {
        starter: { monthly: 2400 },
        growth: { monthly: 4800 },
        scale: { monthly: 9600 },
        dedicated: { monthly: 19500 }
    };
    
    const exchangeRates = {
        PKR: 1,
        USD: 278.50,
        GBP: 355.00
    };
    
    // Elements
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const currencySelect = document.getElementById('currency-select');
    const priceAnnouncement = document.getElementById('price-announcement');
    
    // Get saved preferences or defaults
    let currentPeriod = localStorage.getItem('pkhosting-vps-period') || 'monthly';
    let currentCurrency = localStorage.getItem('pkhosting-vps-currency') || 'PKR';
    
    // Validate saved values
    if (!['monthly', 'annually'].includes(currentPeriod)) {
        currentPeriod = 'monthly';
    }
    if (!['PKR', 'USD', 'GBP'].includes(currentCurrency)) {
        currentCurrency = 'PKR';
    }
    
    // Initialize UI
    initializeControls();
    updatePricing();
    
    function initializeControls() {
        // Set billing toggle
        toggleBtns.forEach(btn => {
            if (btn.dataset.period === currentPeriod) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
        
        // Set currency selector
        currencySelect.value = currentCurrency;
        
        // Add event listeners
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                currentPeriod = this.dataset.period;
                localStorage.setItem('pkhosting-vps-period', currentPeriod);
                
                updatePricing();
            });
            
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        currencySelect.addEventListener('change', function() {
            currentCurrency = this.value;
            localStorage.setItem('pkhosting-vps-currency', currentCurrency);
            updatePricing();
        });
    }
    
    function updatePricing() {
        // Calculate annual prices
        // Annual billing charges only 10 months for 12
        // annualTotal = monthlyPrice * 10
        // annualMonthlyEquivalent = annualTotal / 12
        // savings = monthlyPrice * 2
        
        const plans = ['starter', 'growth', 'scale', 'dedicated'];
        
        plans.forEach(plan => {
            const monthlyPKR = pricingData[plan].monthly;
            const annualTotalPKR = monthlyPKR * 10;
            const annualMonthlyEquivalentPKR = annualTotalPKR / 12;
            const savingsPKR = monthlyPKR * 2;
            
            // Update price display (monthly)
            const priceDisplay = document.querySelector(`.price-display[data-plan="${plan}"]`);
            if (priceDisplay) {
                if (currentPeriod === 'monthly') {
                    priceDisplay.style.display = 'block';
                    const amountEl = priceDisplay.querySelector('.price-amount');
                    const periodEl = priceDisplay.querySelector('.price-period');
                    
                    const convertedAmount = convertCurrency(monthlyPKR, currentCurrency);
                    amountEl.textContent = formatCurrency(convertedAmount, currentCurrency);
                    periodEl.textContent = '/ month';
                } else {
                    priceDisplay.style.display = 'none';
                }
            }
            
            // Update price details (annual)
            const priceDetails = document.querySelector(`.price-details[data-plan="${plan}"]`);
            if (priceDetails) {
                if (currentPeriod === 'annually') {
                    priceDetails.style.display = 'block';
                    const annualAmountEl = priceDetails.querySelector('.price-amount-annual');
                    const billedEl = priceDetails.querySelector('.price-billed');
                    const savingsEl = priceDetails.querySelector('.price-savings');
                    
                    const annualMonthlyConverted = convertCurrency(annualMonthlyEquivalentPKR, currentCurrency);
                    const annualTotalConverted = convertCurrency(annualTotalPKR, currentCurrency);
                    const savingsConverted = convertCurrency(savingsPKR, currentCurrency);
                    
                    annualAmountEl.textContent = formatCurrency(annualMonthlyConverted, currentCurrency);
                    billedEl.textContent = formatCurrency(annualTotalConverted, currentCurrency) + ' billed annually';
                    savingsEl.textContent = 'Save ' + formatCurrency(savingsConverted, currentCurrency);
                } else {
                    priceDetails.style.display = 'none';
                }
            }
        });
        
        // Announce price changes for screen readers
        announcePriceChange();
    }
    
    function convertCurrency(pkrAmount, currency) {
        if (currency === 'PKR') {
            return pkrAmount;
        } else if (currency === 'USD') {
            return pkrAmount / exchangeRates.USD;
        } else if (currency === 'GBP') {
            return pkrAmount / exchangeRates.GBP;
        }
        return pkrAmount;
    }
    
    function formatCurrency(amount, currency) {
        if (currency === 'PKR') {
            // Whole number for PKR
            return 'Rs ' + Math.round(amount).toLocaleString('en-US');
        } else if (currency === 'USD') {
            // Two decimals for USD
            return '$' + amount.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
        } else if (currency === 'GBP') {
            // Two decimals for GBP
            return '£' + amount.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
        }
        return amount.toString();
    }
    
    function announcePriceChange() {
        const periodText = currentPeriod === 'monthly' ? 'monthly billing' : 'annual billing';
        const currencyText = currentCurrency === 'PKR' ? 'Pakistani Rupees' : 
                            currentCurrency === 'USD' ? 'US dollars' : 'British Pounds';
        
        priceAnnouncement.textContent = `Prices updated to ${periodText} in ${currencyText}.`;
    }
});
