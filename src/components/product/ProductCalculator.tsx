"use client";

import React, { useState, useEffect } from "react";
import { Ruler, Trash2 } from "lucide-react";

const ProductCalculator = ({ price, productName }: { price: number, productName: string }) => {
  const [rooms, setRooms] = useState([{ id: 1, length: "", width: "" }]);
  const [totalSqft, setTotalSqft] = useState(0);
  const [wasteFactor, setWasteFactor] = useState(10); // Default 10%

  useEffect(() => {
    const sqft = rooms.reduce((acc, room) => {
      const l = parseFloat(room.length) || 0;
      const w = parseFloat(room.width) || 0;
      return acc + (l * w);
    }, 0);
    setTotalSqft(sqft);
  }, [rooms]);

  const addRoom = () => {
    setRooms([...rooms, { id: Date.now(), length: "", width: "" }]);
  };

  const updateRoom = (id: number, field: string, value: string) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, [field]: value } : room));
  };

  const removeRoom = (id: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const finalSqft = totalSqft * (1 + wasteFactor / 100);
  const totalPrice = finalSqft * price;

  return (
    <div className="bg-secondary/50 rounded-3xl p-8 border border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Ruler className="text-accent" size={24} />
        <h3 className="text-xl font-bold">Square Footage Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        {rooms.map((room, index) => (
          <div key={room.id} className="flex flex-wrap gap-4 items-end p-4 bg-white rounded-2xl border border-border/30">
            <div className="flex-grow min-w-[120px]">
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Room {index + 1} Length (ft)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-secondary/30 border-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-accent transition-all"
                value={room.length}
                onChange={(e) => updateRoom(room.id, "length", e.target.value)}
              />
            </div>
            <div className="flex-grow min-w-[120px]">
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Room {index + 1} Width (ft)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-secondary/30 border-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-accent transition-all"
                value={room.width}
                onChange={(e) => updateRoom(room.id, "width", e.target.value)}
              />
            </div>
            {rooms.length > 1 && (
              <button 
                onClick={() => removeRoom(room.id)}
                className="h-12 w-12 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <button 
          onClick={addRoom}
          className="text-accent font-bold hover:underline text-sm"
        >
          + Add Another Room
        </button>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground">Waste Factor (%)</label>
          <select 
            className="bg-white border-border rounded-lg text-sm p-2"
            value={wasteFactor}
            onChange={(e) => setWasteFactor(parseInt(e.target.value))}
          >
            <option value={5}>5%</option>
            <option value={10}>10% (Recommended)</option>
            <option value={15}>15%</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-wider">Total Area</p>
          <p className="text-3xl font-bold">{finalSqft.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">sqft</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-wider">Estimated Total</p>
          <p className="text-3xl font-bold text-accent">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCalculator;
