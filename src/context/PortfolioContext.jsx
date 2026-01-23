import { createContext, useContext, useState, useEffect } from 'react';
import { portfolioConfig as initialConfig } from '../portfolio.config';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
    const [data, setData] = useState(() => {
        // Try to load from localStorage
        const saved = localStorage.getItem('portfolio_data_v1');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse portfolio data', e);
            }
        }
        // Fallback to initial config
        return initialConfig;
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Auto-save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('portfolio_data_v1', JSON.stringify(data));
    }, [data]);

    // Admin Login
    const login = (password) => {
        // Simple frontend logic - in real app use backend
        if (password === 'admin123') { // Default password for demo
            setIsAdmin(true);
            setIsEditMode(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        setIsEditMode(false);
    };

    // Generic update function for any path in the data object
    const updateData = (path, value) => {
        setData(prev => {
            const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const addSection = (path, template) => {
        setData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            const target = current[keys[keys.length - 1]];
            if (Array.isArray(target)) {
                const newItem = typeof template === 'object' && template !== null
                    ? { ...template, id: Date.now() }
                    : template;
                target.push(newItem);
            }
            return newData;
        });
    };

    const deleteItem = (path, index) => {
        setData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const target = current[keys[keys.length - 1]];
            if (Array.isArray(target)) {
                target.splice(index, 1);
            }
            return newData;
        });
    };

    const resetToDefaults = () => {
        if (window.confirm('Are you sure? This will discard all your changes.')) {
            setData(initialConfig);
        }
    };

    return (
        <PortfolioContext.Provider value={{
            data,
            isAdmin,
            isEditMode,
            login,
            logout,
            toggleEditMode: () => setIsEditMode(!isEditMode),
            updateData,
            addSection,
            deleteItem,
            resetToDefaults
        }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
