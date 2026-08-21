import React, { useState, useEffect } from 'react';
import { Activity, Radio, TrendingUp, Cpu, RefreshCw, BarChart2, Zap } from 'lucide-react';

export default function TradingDemoWidget() {
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [timeframe, setTimeframe] = useState('1m');
  const [latency, setLatency] = useState(8);
  const [currentPrice, setCurrentPrice] = useState(94250.50);
  const [priceChange, setPriceChange] = useState(3.42);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [tradeTicks, setTradeTicks] = useState([]);

  // Generate initial orderbook & trades
  useEffect(() => {
    generateInitialData();
    const interval = setInterval(() => {
      simulateLiveWebsocketTick();
    }, 450);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const generateInitialData = () => {
    const bids = [];
    const asks = [];
    const base = currentPrice;

    for (let i = 0; i < 6; i++) {
      bids.push({
        price: (base - (i + 1) * 4.5).toFixed(2),
        size: (Math.random() * 1.8 + 0.2).toFixed(4),
        total: ((i + 1) * 2.1).toFixed(2),
      });
      asks.push({
        price: (base + (i + 1) * 4.5).toFixed(2),
        size: (Math.random() * 1.8 + 0.2).toFixed(4),
        total: ((i + 1) * 2.1).toFixed(2),
      });
    }

    setOrderBook({ bids, asks });

    const ticks = [];
    for (let i = 0; i < 5; i++) {
      ticks.push({
        id: Math.random().toString(36).substr(2, 6),
        price: (base + (Math.random() * 10 - 5)).toFixed(2),
        size: (Math.random() * 0.8 + 0.05).toFixed(4),
        type: Math.random() > 0.5 ? 'buy' : 'sell',
        time: new Date().toLocaleTimeString(),
      });
    }
    setTradeTicks(ticks);
  };

  const simulateLiveWebsocketTick = () => {
    const delta = (Math.random() - 0.48) * 12;
    const newPrice = Math.max(90000, currentPrice + delta);
    setCurrentPrice(newPrice);
    setLatency(Math.floor(6 + Math.random() * 8));

    // Update orderbook
    setOrderBook((prev) => {
      const newBids = prev.bids.map((b) => ({
        ...b,
        size: (Math.max(0.1, parseFloat(b.size) + (Math.random() * 0.4 - 0.2))).toFixed(4),
      }));
      const newAsks = prev.asks.map((a) => ({
        ...a,
        size: (Math.max(0.1, parseFloat(a.size) + (Math.random() * 0.4 - 0.2))).toFixed(4),
      }));
      return { bids: newBids, asks: newAsks };
    });

    // Add new trade tick
    const newTick = {
      id: Math.random().toString(36).substr(2, 6),
      price: newPrice.toFixed(2),
      size: (Math.random() * 0.9 + 0.02).toFixed(4),
      type: delta >= 0 ? 'buy' : 'sell',
      time: new Date().toLocaleTimeString(),
    };

    setTradeTicks((prev) => [newTick, ...prev.slice(0, 5)]);
  };

  return (
    <section id="trading-demo" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>WEBSOCKET REAL-TIME TRADING ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          High-Frequency <span className="aurora-text-gradient">Real-Time UI</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Interactive simulation demonstrating low-latency WebSocket data streaming, live orderbooks, and candlestick charts built for institutional trading platforms.
        </p>
      </div>

      {/* Main Trading Widget Container */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Top Controls & Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
          
          <div className="flex items-center gap-4">
            {/* Pair Selector */}
            <div className="flex items-center gap-2">
              {['BTC/USDT', 'ETH/USDT', 'SOL/USDT'].map((p) => (
                <button
                  key={p}
                  onClick={() => setSymbol(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    symbol === p
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Price Header */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-outfit font-black text-slate-100 font-mono">
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                +{priceChange}%
              </span>
            </div>
          </div>

          {/* Latency & Stream Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Latency: <strong className="text-emerald-400">{latency}ms</strong></span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>WebSocket Streaming</span>
            </div>
          </div>

        </div>

        {/* Grid Content: Chart + Orderbook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Simulated Candlestick & Volume Chart (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 min-h-[340px]">
            
            {/* Chart Toolbar */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <BarChart2 className="w-4 h-4 text-sky-400" />
                Lightweight Candlestick Engine
              </span>

              <div className="flex gap-1">
                {['1m', '5m', '15m', '1h'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      timeframe === tf ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Candlestick Simulation */}
            <div className="w-full h-56 relative flex items-end gap-2 pt-4 px-2">
              {[
                { o: 93800, h: 94100, l: 93600, c: 94050, v: 40 },
                { o: 94050, h: 94350, l: 93900, c: 94300, v: 65 },
                { o: 94300, h: 94400, l: 94100, c: 94150, v: 50 },
                { o: 94150, h: 94500, l: 94100, c: 94480, v: 80 },
                { o: 94480, h: 94600, l: 94300, c: 94350, v: 45 },
                { o: 94350, h: 94700, l: 94250, c: 94650, v: 95 },
                { o: 94650, h: 94800, l: 94500, c: 94720, v: 75 },
                { o: 94720, h: 94900, l: 94400, c: 94250, v: 85 },
              ].map((candle, idx) => {
                const isBullish = candle.c >= candle.o;
                const heightPct = Math.abs(candle.c - candle.o) / 10;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 hidden group-hover:block bg-slate-900 text-[10px] font-mono text-slate-200 px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-20">
                      O: {candle.o} C: {candle.c}
                    </div>

                    {/* Wick Line */}
                    <div
                      className={`w-[1.5px] ${isBullish ? 'bg-emerald-400' : 'bg-rose-400'}`}
                      style={{ height: '65%' }}
                    />

                    {/* Candle Body */}
                    <div
                      className={`w-full max-w-[20px] rounded-sm transition-all ${
                        isBullish ? 'bg-emerald-400/90 shadow-sm shadow-emerald-500/50' : 'bg-rose-400/90 shadow-sm shadow-rose-500/50'
                      }`}
                      style={{ height: `${Math.max(15, heightPct * 2)}px` }}
                    />

                    {/* Volume Bar */}
                    <div
                      className={`w-full max-w-[20px] mt-2 rounded-t-sm ${
                        isBullish ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                      }`}
                      style={{ height: `${candle.v * 0.4}px` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom Chart Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
              <span>Synchronized Candle + Volume Streaming</span>
              <span>Lightweight Charts • Sub-second Load</span>
            </div>

          </div>

          {/* Right Column: Live Order Book & Match Ticks (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300 border-b border-slate-800 pb-2">
                <span className="font-bold text-emerald-400">Live Orderbook</span>
                <span className="text-slate-500">Size / Total</span>
              </div>

              {/* Asks (Sells in Red) */}
              <div className="space-y-1 mb-2">
                {orderBook.asks.slice(0, 3).reverse().map((ask, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] font-mono relative py-0.5">
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-500/15 rounded-sm pointer-events-none"
                      style={{ width: `${Math.min(100, parseFloat(ask.size) * 40)}%` }}
                    />
                    <span className="text-rose-400 font-semibold relative">{ask.price}</span>
                    <span className="text-slate-300 relative">{ask.size}</span>
                  </div>
                ))}
              </div>

              {/* Spread Indicator */}
              <div className="py-1 text-center bg-slate-900/60 border-y border-slate-800 text-[10px] font-mono text-emerald-400 font-bold">
                Spread: 0.05 USDT
              </div>

              {/* Bids (Buys in Green) */}
              <div className="space-y-1 mt-2">
                {orderBook.bids.slice(0, 3).map((bid, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] font-mono relative py-0.5">
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 rounded-sm pointer-events-none"
                      style={{ width: `${Math.min(100, parseFloat(bid.size) * 40)}%` }}
                    />
                    <span className="text-emerald-400 font-semibold relative">{bid.price}</span>
                    <span className="text-slate-300 relative">{bid.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Matched Trade Stream */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                <span>Recent Trades</span>
                <span className="text-emerald-400">Live Match</span>
              </div>
              <div className="space-y-1">
                {tradeTicks.slice(0, 3).map((tick) => (
                  <div key={tick.id} className="flex justify-between text-[10px] font-mono">
                    <span className={tick.type === 'buy' ? 'text-emerald-400' : 'text-rose-400'}>
                      {tick.price}
                    </span>
                    <span className="text-slate-300">{tick.size}</span>
                    <span className="text-slate-500">{tick.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
