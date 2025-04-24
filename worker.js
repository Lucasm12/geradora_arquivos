// Usar SharedArrayBuffer para comunicação mais rápida
let sharedMemory;
let processedCount = 0;

self.onmessage = function(e) {
    const { chunk, fields, startIndex, batchSize = 200 } = e.data;
    
    try {
        // Processar em micro-batches para melhor performance
        const results = new Array(chunk.length);
        
        // Loop otimizado para processamento em batch
        for (let i = 0; i < chunk.length; i++) {
            const row = chunk[i];
            const rowData = {};
            
            // Loop otimizado para campos
            for (let j = 0; j < fields.length; j++) {
                const field = fields[j];
                const value = row[j];
                
                if (value !== undefined && value !== null && 
                    field.id !== 'tipoMovimentacao' && 
                    field.id !== 'dataOperacao') {
                    rowData[field.id] = value;
                }
            }
            
            rowData.rowIndex = startIndex + i;
            results[i] = rowData;
            
            // Enviar progresso a cada 100 registros
            if ((i + 1) % 100 === 0) {
                self.postMessage({
                    type: 'progress',
                    processed: i + 1,
                    total: chunk.length
                });
            }
        }
        
        // Enviar resultados em uma única mensagem
        self.postMessage({
            type: 'complete',
            data: results
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            error: error.message
        });
    }
};