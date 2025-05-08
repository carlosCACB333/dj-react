import '@/styles/globals.css';
import { ToastProvider } from '@heroui/toast';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './app.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToastProvider />
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
