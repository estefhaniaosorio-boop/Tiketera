import React, { useRef, useState, useEffect } from 'react';

interface SignaturePadProps {
  onSignatureComplete: (signatureDataUrl: string) => void;
  onCancel: () => void;
  signerName: string;
}

type SignatureMode = 'draw' | 'upload';

/**
 * Componente de captura de firma: permite dibujar a mano alzada o adjuntar imagen.
 */
const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureComplete, onCancel, signerName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState<SignatureMode>('draw');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor seleccione un archivo de imagen (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (mode === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas || !hasDrawn) return;
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureComplete(dataUrl);
    } else if (mode === 'upload' && uploadedImage) {
      onSignatureComplete(uploadedImage);
    }
  };

  const isConfirmDisabled = mode === 'draw' ? !hasDrawn : !uploadedImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <h3 className="text-lg font-bold text-primary mb-1">Firma del contrato</h3>
        <p className="text-sm text-gray-500 mb-4">Firmante: {signerName}</p>

        {/* Tabs de modo */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setMode('draw')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === 'draw'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ✏️ Dibujar firma
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === 'upload'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📎 Adjuntar imagen
          </button>
        </div>

        {/* Contenido según modo */}
        {mode === 'draw' && (
          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mb-3">
              <canvas
                ref={canvasRef}
                width={460}
                height={180}
                className="w-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            <p className="text-xs text-gray-400 text-center mb-3">
              Dibuje su firma con el mouse o el dedo (en móvil)
            </p>
            <button
              onClick={clearCanvas}
              className="text-sm text-gray-500 hover:text-primary underline"
            >
              Limpiar
            </button>
          </div>
        )}

        {mode === 'upload' && (
          <div className="mb-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {uploadedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <img
                  src={uploadedImage}
                  alt="Firma adjunta"
                  className="max-h-40 mx-auto mb-2 object-contain"
                />
                <button
                  onClick={() => { setUploadedImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-sm text-gray-500 hover:text-primary underline"
                >
                  Cambiar imagen
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-green-50 transition-colors"
              >
                <p className="text-gray-500">📎 Haga clic para seleccionar una imagen de su firma</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG o similar</p>
              </button>
            )}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirmar firma
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          Después de firmar, se completará la verificación biométrica para validar su identidad.
        </p>
      </div>
    </div>
  );
};

export default SignaturePad;
