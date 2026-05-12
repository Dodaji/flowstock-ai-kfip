import { useState, useRef, useEffect } from 'react';
import { Package, LineChart, BrainCircuit, Activity, ArrowRightLeft, ShieldCheck, Wallet, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('sme');
  const [logs, setLogs] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState('raw'); // raw -> analyzing -> tokenized
  const [fundingStatus, setFundingStatus] = useState('none'); // none -> escrowed -> liquidated/repaid
  const [walletAddress, setWalletAddress] = useState(null);
  const logsEndRef = useRef(null);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Demo Actions
  const connectWallet = () => {
    addLog('Connecting to XRPL Testnet...', 'info');
    setTimeout(() => {
      setWalletAddress('rQHvAR5ae3P8EvGHWgorwt8kZ7tqpuHVJs');
      addLog('Connected to wallet: rQHvAR5ae3P8EvGHWgorwt8kZ7tqpuHVJs', 'success');
    }, 1000);
  };

  const runAIEvaluation = () => {
    setInventoryStatus('analyzing');
    addLog('Fetching Shopify Inventory Data...', 'info');
    setTimeout(() => {
      addLog('AI Oracle: Analyzing sales velocity and market trends...', 'info');
      setTimeout(() => {
        addLog('AI Oracle: Evaluation Complete. 10,000 Winter Jackets valued at $150,000.', 'success');
        addLog('AI Oracle: 3-Month Sales Probability: 92%', 'success');
        addLog('XRPL: Preparing MPTokenIssuanceCreate Transaction...', 'warning');
        
        setTimeout(() => {
          setInventoryStatus('tokenized');
          addLog('XRPL: MPT Issued! Token ID: 000004C4...1A3B', 'success');
          addLog('XRPL: Ledger Index 45891023 validated.', 'info');
        }, 1500);
      }, 2000);
    }, 1000);
  };

  const fundEscrow = () => {
    setFundingStatus('escrowed');
    addLog('Investor: Initiating $150,000 Funding...', 'info');
    setTimeout(() => {
      addLog('XRPL: Preparing EscrowCreate Transaction...', 'warning');
      setTimeout(() => {
        addLog('XRPL: Escrow Created! Condition: MPT Transfer / CancelAfter: 90 Days', 'success');
        addLog('XRPL: Funds Locked. Seller Liquidity injected.', 'success');
      }, 1500);
    }, 1000);
  };

  const triggerLiquidation = () => {
    setFundingStatus('liquidated');
    addLog('AI Oracle: Market shift detected. Sales velocity dropping.', 'error');
    setTimeout(() => {
      addLog('XRPL: Price Oracle (XLS-47) updated. Value dropped below threshold.', 'warning');
      setTimeout(() => {
        addLog('XRPL: Triggering Permissioned DEX (XLS-81) Liquidation...', 'error');
        addLog('XRPL: MPT sold to Wholesaler 0x8A...3F for $130,000.', 'success');
        addLog('XRPL: Investor principal partially recovered.', 'info');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <Activity size={28} />
          <span>FlowStock AI</span>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'sme' ? 'active' : ''}`}
            onClick={() => setActiveTab('sme')}
          >
            <Package size={16} style={{display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom'}} />
            SME Seller
          </button>
          <button 
            className={`nav-tab ${activeTab === 'investor' ? 'active' : ''}`}
            onClick={() => setActiveTab('investor')}
          >
            <LineChart size={16} style={{display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom'}} />
            Institutional Investor
          </button>
        </div>
        <div>
          <button 
            className="btn" 
            style={{
              background: walletAddress ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)', 
              color: walletAddress ? 'var(--accent)' : 'inherit',
              border: walletAddress ? '1px solid var(--accent)' : 'none'
            }} 
            onClick={connectWallet}
            disabled={!!walletAddress}
          >
            <Wallet size={16} /> {walletAddress ? `${walletAddress.slice(0,5)}...${walletAddress.slice(-4)}` : 'Connect XRPL'}
          </button>
        </div>
      </header>

      <div className="grid-container">
        {/* Main Panel */}
        <div className="glass-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'sme' ? (
              <motion.div 
                key="sme"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="panel-header">
                  <h2 className="panel-title"><Database size={24} color="var(--primary)" /> Inventory Tokenization</h2>
                  <span className="badge badge-ai">Shopify Connected</span>
                </div>

                <div className="data-card">
                  <div className="data-row">
                    <span className="data-label">Selected Inventory</span>
                    <span className="data-value">Winter Jackets (SKU-8910)</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Quantity</span>
                    <span className="data-value">10,000 units</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Book Value</span>
                    <span className="data-value">$200,000</span>
                  </div>
                </div>

                {inventoryStatus === 'raw' && (
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      Your capital is locked in inventory. Run AI evaluation to tokenize and get liquidity.
                    </p>
                    <button className="btn btn-primary" onClick={runAIEvaluation}>
                      <BrainCircuit size={20} /> Evaluate & Tokenize
                    </button>
                  </div>
                )}

                {inventoryStatus === 'analyzing' && (
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <BrainCircuit size={48} color="var(--primary)" style={{ animation: 'pulse 2s infinite', margin: '0 auto' }} />
                    <h3 style={{ marginTop: '1rem' }}>AI Oracle is Analyzing...</h3>
                    <div className="progress-bar-container">
                      <div className="progress-bar shimmer" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}

                {inventoryStatus === 'tokenized' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="data-card" style={{ borderColor: 'var(--accent)', background: 'rgba(16, 185, 129, 0.05)' }}>
                      <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={20} /> AI Evaluation Complete
                      </h3>
                      <div className="data-row">
                        <span className="data-label">Oracle Valuation</span>
                        <span className="data-value success">$150,000 (75% of Book)</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Risk / 90d Sales Prob.</span>
                        <span className="data-value">Low / 92%</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">XRPL MPT ID</span>
                        <span className="data-value" style={{ fontFamily: 'monospace' }}>000004C4...1A3B</span>
                      </div>
                    </div>
                    
                    {fundingStatus === 'none' ? (
                      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Waiting for Institutional Funding...</p>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                        🎉 $150,000 Liquidity Injected to your Wallet!
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="investor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="panel-header">
                  <h2 className="panel-title"><ArrowRightLeft size={24} color="var(--accent)" /> RWA Liquidity Market</h2>
                  <span className="badge badge-ai">Permissioned DEX</span>
                </div>

                {inventoryStatus !== 'tokenized' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                    No new RWA tokens available for funding.
                  </div>
                ) : (
                  <>
                    <div className="data-card">
                      <div className="data-row">
                        <span className="data-label">Asset Type</span>
                        <span className="data-value">Inventory MPT (Winter Jackets)</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Required Funding</span>
                        <span className="data-value">$150,000 (USDC)</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Expected APY</span>
                        <span className="data-value success">12.5% (90 days)</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">AI Risk Score</span>
                        <span className="data-value">A (92% clearance prob.)</span>
                      </div>
                    </div>

                    {fundingStatus === 'none' && (
                      <button className="btn btn-accent" style={{ width: '100%' }} onClick={fundEscrow}>
                        <Wallet size={20} /> Fund via Token-Enabled Escrow
                      </button>
                    )}

                    {fundingStatus === 'escrowed' && (
                      <div style={{ marginTop: '1.5rem' }}>
                        <div className="data-card" style={{ borderColor: 'var(--primary)' }}>
                          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Funds Locked in Escrow</h3>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Awaiting inventory sales. Smart contract will auto-route revenue to you.
                          </p>
                        </div>
                        <button className="btn" style={{ width: '100%', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }} onClick={triggerLiquidation}>
                          Simulate Market Crash (Liquidation)
                        </button>
                      </div>
                    )}

                    {fundingStatus === 'liquidated' && (
                      <div className="data-card" style={{ borderColor: 'var(--danger)', background: 'rgba(239, 68, 68, 0.05)' }}>
                        <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Asset Liquidated</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          AI detected price drop. MPT was sold on Permissioned DEX to wholesalers. $130,000 recovered.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Panel */}
        <div className="glass-panel" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#94a3b8' }}>XRPL Testnet Log</span>
          </div>
          <div className="terminal-panel" style={{ border: 'none', borderRadius: '0 0 1rem 1rem', flex: 1 }}>
            {logs.length === 0 ? (
              <span style={{ color: '#64748b' }}>Waiting for transactions...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="log-line">
                  <span className="log-time">[{log.time}]</span>
                  <span className={`log-${log.type}`}>{log.msg}</span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
