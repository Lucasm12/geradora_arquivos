document.addEventListener('DOMContentLoaded', function() {
    // Definição de todos os campos (apenas alguns exemplos - adicione todos)
    const fields = [
        { id: 'sequencialRegistro', name: 'Seq.Registro', description: 'Sequencial de Registro' },
        { 
            id: 'tipoRegistro', 
            name: 'Tipo Reg.', 
            description: 'Tipo de Registro',
            type: 'select',
            options: [
                { value: 'N', label: 'N', description: 'Nova Adesão Titular' },
                { value: 'C', label: 'C', description: 'Cancelamento' },
                { value: 'A', label: 'A', description: 'Alteração de Dados Cadastrais' },
                { value: 'U', label: 'U', description: 'Movimentação de Plano (Upgrade)' },
                { value: 'D', label: 'D', description: 'Novo Dependente' },
                { value: 'I', label: 'I', description: 'Inclusão de Dependente' },
                { value: 'E', label: 'E', description: 'Exclusão de Dependente' }
            ]
        },
        { id: 'plano', name: 'Plano', description: 'Plano' },
        { id: 'codigoBeneficiario', name: 'Cód.Benef.', description: 'Código do Beneficiário' },
        { id: 'nomeCompleto', name: 'Nome Completo', description: 'Nome Completo' },
        { id: 'cpfBeneficiario', name: 'CPF', description: 'CPF do Beneficiário' },
        { id: 'rgRneBeneficiario', name: 'RG/RNE', description: 'RG/RNE do Beneficiário' },
        { id: 'orgaoExpedidor', name: 'Órgão Exp.', description: 'Órgão Expedidor' },
        { id: 'nomeMae', name: 'Nome Mãe', description: 'Nome da Mãe' },
        { id: 'dataNascimento', name: 'Dt.Nasc.', description: 'Data Nascimento' },
        { id: 'sexo', name: 'Sexo', description: 'Sexo' },
        { id: 'cns', name: 'CNS', description: 'CNS' },
        { id: 'estadoCivil', name: 'Est.Civil', description: 'Estado Civil' },
        { id: 'logradouro', name: 'Logradouro', description: 'Logradouro' },
        { id: 'numero', name: 'Número', description: 'Numero' },
        { id: 'complemento', name: 'Complemento', description: 'Complemento' },
        { id: 'bairro', name: 'Bairro', description: 'Bairro' },
        { id: 'cidade', name: 'Cidade', description: 'Cidade' },
        { id: 'uf', name: 'UF', description: 'UF' },
        { id: 'cep', name: 'CEP', description: 'CEP' },
        { id: 'tipoTelefone1', name: 'Tipo Tel.1', description: 'Tipo de Telefone 1' },
        { id: 'dddTelefone1', name: 'DDD Tel.1', description: 'DDD Telefone 1' },
        { id: 'telefone1', name: 'Telefone 1', description: 'Telefone 1' },
        { id: 'ramalTelefone1', name: 'Ramal 1', description: 'Ramal Telefone 1' },
        { id: 'tipoTelefone2', name: 'Tipo Tel.2', description: 'Tipo de Telefone 2' },
        { id: 'dddTelefone2', name: 'DDD Tel.2', description: 'DDD Telefone 2' },
        { id: 'telefone2', name: 'Telefone 2', description: 'Telefone 2' },
        { id: 'ramalTelefone2', name: 'Ramal 2', description: 'Ramal Telefone 2' },
        { id: 'servidorPublico', name: 'Serv.Público', description: 'Servidor Publico' },
        { id: 'tipoMovimentacao', name: 'Tipo Mov.', description: 'Tipo de Movimentação' },
        { id: 'valorMensalidade', name: 'Valor Mens.', description: 'Valor da Mensalidade' },
        { id: 'dataOperacao', name: 'Dt.Operação', description: 'Data da Operação' },
        { id: 'dataInicioVigencia', name: 'Dt.Início', description: 'Data de Inicio Vigência' },
        { id: 'motivoCancelamento', name: 'Motivo Canc.', description: 'Motivo de Cancelamento' },
        { id: 'formaPagamento', name: 'Forma Pag.', description: 'Forma de Pagamento' },
        { id: 'banco', name: 'Banco', description: 'Banco' },
        { id: 'agencia', name: 'Agência', description: 'Agencia' },
        { id: 'contaCorrente', name: 'Conta', description: 'Conta Corrente' },
        { id: 'tipoConta', name: 'Tipo Conta', description: 'Tipo de Conta' },
        { id: 'codigoVendedor', name: 'Cód.Vendedor', description: 'Código do Vendedor' },
        { id: 'codigoGerente', name: 'Cód.Gerente', description: 'Código do Gerente' },
        { id: 'codigoLoja', name: 'Cód.Loja', description: 'Código da Loja' },
        { id: 'codigoRegional', name: 'Cód.Regional', description: 'Código da Regional' },
        { id: 'contrato', name: 'Contrato', description: 'Contrato' },
        { id: 'locacao', name: 'Locação', description: 'Locacao' },
        { id: 'email', name: 'E-mail', description: 'E-mail' },
        { id: 'diaCobranca', name: 'Dia Cobr.', description: 'Dia Cobrança' },
        { id: 'grauParentesco', name: 'Grau Parent.', description: 'Grau de parentesco' },
        { id: 'vinculoCpfTitular', name: 'CPF Titular', description: 'Vinculo CPF Titular' },
        { id: 'codigoBeneficiarioTitular', name: 'Cód.Ben.Titular', description: 'Código do Beneficiário Titular' },
        { id: 'funcionalMatricula', name: 'Func/Matrícula', description: 'Funcional/Matricula' },
        { id: 'centroCusto', name: 'Centro Custo', description: 'Centro de Custo' },
        { id: 'carteirinha', name: 'Carteirinha', description: 'Carteirinha' },
        { id: 'naturezaDocumentoIdentificacao', name: 'Nat.Doc.ID', description: 'Natureza Documento Identificação' },
        { id: 'dataExpedicao', name: 'Dt.Expedição', description: 'Data Expedição' },
        { id: 'passaporteCarteiraCivil', name: 'Passaporte', description: 'Passaporte Carteira Civil' },
        { id: 'atividadePrincipalDesenvolvida', name: 'Atividade', description: 'Atividade Principal Desenvolvida' },
        { id: 'idRegistroRemessa', name: 'ID Remessa', description: 'ID Registro Remessa' },
        { id: 'emBranco1', name: 'Em branco 1', description: 'Campo em branco 1' },
        { id: 'emBranco2', name: 'Em branco 2', description: 'Campo em branco 2' }
    ];

    // Adicionar constante com os tipos válidos
    const TIPOS_REGISTRO_VALIDOS = ['N', 'C', 'A', 'U', 'D', 'I', 'E'];

    // Elementos do DOM
    const headerRow = document.getElementById('headerRow');
    const sheetBody = document.getElementById('sheetBody');
    const output = document.getElementById('output');
    const btnCopy = document.getElementById('btnCopy');
    const btnDownload = document.getElementById('btnDownload');
    const btnAddRow = document.getElementById('btnAddRow');
    const btnGenerate = document.getElementById('btnGenerate');

    // Variáveis de estado
    let activeCell = null;
    let spreadsheetData = [];
    let selectedTipoRegistro = '';
    let defaultTipoRegistro = '';

    // Inicialização
    function initSpreadsheet() {
        // Limpar tabela
        headerRow.innerHTML = '';
        sheetBody.innerHTML = '';
        
        // Adicionar coluna de ações
        const actionHeader = document.createElement('th');
        actionHeader.textContent = 'Ações';
        actionHeader.className = 'row-actions bg-gray-50';
        headerRow.appendChild(actionHeader);
        
        // Criar cabeçalhos das colunas
        fields.forEach(field => {
            const th = document.createElement('th');
            th.className = 'text-left text-xs font-medium text-gray-500 uppercase truncate';
            
            if (field.type === 'select') {
                // Criar wrapper para o cabeçalho do select
                const headerWrapper = document.createElement('div');
                headerWrapper.className = 'header-select-wrapper';
                
                // Adicionar o nome do campo
                const fieldName = document.createElement('div');
                fieldName.textContent = field.name;
                fieldName.className = 'field-name';
                headerWrapper.appendChild(fieldName);
                
                // Criar select para o cabeçalho
                const headerSelect = document.createElement('select');
                headerSelect.className = 'header-select';
                
                // Adicionar opção vazia inicial
                const emptyOption = document.createElement('option');
                emptyOption.value = '';
                emptyOption.textContent = 'Selecione...';
                headerSelect.appendChild(emptyOption);
                
                // Adicionar as opções do select
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = `${option.value} - ${option.description}`;
                    headerSelect.appendChild(optionElement);
                });
                
                // Evento de mudança para o select do cabeçalho
                headerSelect.addEventListener('change', function() {
                    const selectedValue = this.value;
                    if (selectedValue) {
                        showChoiceDialog(selectedValue, 0, field.id);
                    }
                    // Não resetar o valor do select para manter a seleção visível
                });
                
                headerWrapper.appendChild(headerSelect);
                th.appendChild(headerWrapper);
            } else {
            th.textContent = field.name;
            }
            
            th.title = field.description;
            headerRow.appendChild(th);
        });
        
        // Adicionar linha inicial
        addNewRow();
    }

    // Adicionar nova linha
    function addNewRow() {
        const rowId = spreadsheetData.length;
        const rowData = {};
        
        // Criar objeto para armazenar dados da linha
        fields.forEach(field => {
            if (field.id === 'tipoRegistro') {
                rowData[field.id] = defaultTipoRegistro || '';
            } else {
            rowData[field.id] = '';
            }
        });
        
        // Preencher o sequencialRegistro automaticamente
        rowData.sequencialRegistro = (rowId + 1).toString();
        
        spreadsheetData.push(rowData);
        
        // Criar elemento da linha
        const row = document.createElement('tr');
        row.dataset.rowId = rowId;
        
        // Coluna de ações
        const actionCell = document.createElement('td');
        actionCell.className = 'row-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '✕';
        deleteBtn.className = 'text-red-600 hover:text-red-800 text-sm p-2 rounded-full hover:bg-red-100 transition-colors';
        deleteBtn.title = 'Remover linha';
        deleteBtn.onclick = function() {
            const currentRowId = parseInt(this.closest('tr').dataset.rowId);
            if (!isNaN(currentRowId)) {
                removeRow(currentRowId);
            }
        };
        
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        
        // Criar células para cada campo
        fields.forEach(field => {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'cell-input';
            input.dataset.fieldId = field.id;
            input.dataset.rowId = rowId;
            input.placeholder = field.name;
            
            // Definir o valor inicial
            if (field.id === 'tipoRegistro') {
                input.value = defaultTipoRegistro || '';
                input.maxLength = 1; // Limitar a 1 caractere
                
                // Adicionar validação para o campo tipo de registro
                input.addEventListener('input', function(e) {
                    let valor = e.target.value.toUpperCase();
                    
                    // Se o valor não estiver vazio, validar
                    if (valor && !TIPOS_REGISTRO_VALIDOS.includes(valor)) {
                        // Mostrar alerta de erro
                        showAlert('Tipo de registro inválido. Use apenas: ' + TIPOS_REGISTRO_VALIDOS.join(', '), 'error');
                        // Limpar o campo
                        e.target.value = '';
                        // Atualizar os dados
                        const rowId = parseInt(e.target.dataset.rowId);
                        spreadsheetData[rowId][field.id] = '';
                        return;
                    }
                    
                    // Manter sempre em maiúsculo
                    e.target.value = valor;
                    
                    // Atualizar os dados
                    const rowId = parseInt(e.target.dataset.rowId);
                    spreadsheetData[rowId][field.id] = valor;
                });
                
                // Adicionar tooltip com os valores válidos
                input.title = 'Valores válidos: ' + TIPOS_REGISTRO_VALIDOS.join(', ') + '\n' +
                             'N - Nova Adesão Titular\n' +
                             'C - Cancelamento\n' +
                             'A - Alteração de Dados Cadastrais\n' +
                             'U - Movimentação de Plano (Upgrade)\n' +
                             'D - Novo Dependente\n' +
                             'I - Inclusão de Dependente\n' +
                             'E - Exclusão de Dependente';
                
                // Adicionar classe para estilo específico
                input.classList.add('tipo-registro-input');
            } else if (field.id === 'sequencialRegistro') {
            input.value = rowData[field.id];
                input.disabled = true;
                input.classList.add('bg-gray-100');
            } else {
                input.value = rowData[field.id];
            }
            
            input.addEventListener('focus', function() {
                if (activeCell) activeCell.classList.remove('active-cell');
                this.classList.add('active-cell');
                activeCell = this;
            });
            
            input.addEventListener('blur', function() {
                const rowId = parseInt(this.dataset.rowId);
                const fieldId = this.dataset.fieldId;
                spreadsheetData[rowId][fieldId] = this.value.trim();
            });
            
            input.addEventListener('keydown', handleKeyNavigation);
            
            cell.appendChild(input);
            row.appendChild(cell);
        });
        
        sheetBody.appendChild(row);
        
        // Focar no primeiro campo editável da nova linha
        const firstEditableInput = row.querySelector('input:not([disabled])');
        if (firstEditableInput) firstEditableInput.focus();
        
        // Debug: verificar dados após adicionar nova linha
        console.log('Estado atual dos dados:', JSON.parse(JSON.stringify(spreadsheetData)));
    }

    // Função auxiliar para navegação com teclas
    function handleKeyNavigation(e) {
        if (e.key === 'Enter' || e.key.startsWith('Arrow')) {
                    e.preventDefault();
            
            const currentCell = e.target.parentElement;
            let targetCell;
            
            switch (e.key) {
                case 'Enter':
                case 'ArrowRight':
                    targetCell = currentCell.nextElementSibling;
                    break;
                case 'ArrowLeft':
                    targetCell = currentCell.previousElementSibling;
                    break;
                case 'ArrowDown':
                    const nextRow = currentCell.parentElement.nextElementSibling;
                    if (nextRow) {
                        const cellIndex = Array.from(currentCell.parentElement.children).indexOf(currentCell);
                        targetCell = nextRow.children[cellIndex];
                    }
                    break;
                case 'ArrowUp':
                    const prevRow = currentCell.parentElement.previousElementSibling;
                    if (prevRow) {
                        const cellIndex = Array.from(currentCell.parentElement.children).indexOf(currentCell);
                        targetCell = prevRow.children[cellIndex];
                    }
                    break;
            }
            
            if (targetCell) {
                const input = targetCell.querySelector('input, select');
                if (input && !input.disabled) {
                    input.focus();
                }
            }
        }
    }

    // Função para criar modal de confirmação
    function showConfirmDialog(message, onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50"></div>
            <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 z-10">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Confirmar exclusão</h3>
                <p class="text-sm text-gray-500 mb-6">${message}</p>
                <div class="flex justify-end gap-3">
                    <button type="button" class="cancel-btn px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                        Cancelar
                    </button>
                    <button type="button" class="confirm-btn px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                        Confirmar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para os botões do modal
        modal.querySelector('.cancel-btn').onclick = () => modal.remove();
        modal.querySelector('.confirm-btn').onclick = () => {
            onConfirm();
            modal.remove();
        };
        
        // Fechar modal ao clicar no overlay
        modal.querySelector('.bg-black').onclick = () => modal.remove();
    }

    // Função removeRow atualizada
    function removeRow(rowId) {
        console.log('Tentando remover linha:', rowId); // Debug log
        
        if (spreadsheetData.length <= 1) {
            showAlert('Você deve manter pelo menos um registro!', 'warning');
            return;
        }
        
        showConfirmDialog('Tem certeza que deseja remover este registro?', function() {
            try {
                // Remover da estrutura de dados
            spreadsheetData.splice(rowId, 1);
                
                // Remover o elemento da tabela
                const rowToRemove = document.querySelector(`tr[data-row-id="${rowId}"]`);
                if (rowToRemove) {
                    rowToRemove.remove();
                }
            
            // Atualizar IDs das linhas restantes e números sequenciais
            const rows = sheetBody.querySelectorAll('tr');
            rows.forEach((row, index) => {
                row.dataset.rowId = index;
                    const inputs = row.querySelectorAll('.cell-input');
                    inputs.forEach(input => {
                    input.dataset.rowId = index;
                    if (input.dataset.fieldId === 'sequencialRegistro') {
                        input.value = (index + 1).toString();
                        spreadsheetData[index].sequencialRegistro = (index + 1).toString();
                    }
                });
            });
                
                showAlert('Registro removido com sucesso', 'success');
            } catch (error) {
                console.error('Erro ao remover linha:', error);
                showAlert('Erro ao remover o registro', 'error');
        }
        });
    }

    // Gerar o arquivo no formato especificado
    function generateFile() {
        let fileContent = '';
        
                // Cabeçalho (linha 1)
                fileContent += `1|H|MOVIMENTACAO|2|${formatDate(new Date())}\n`;
                
        // Para cada registro (linha) na planilha
        spreadsheetData.forEach((rowData, index) => {
            // Número da linha começa em 2 e incrementa
            const lineNumber = index + 2;
            
            // Linha de detalhes
            fileContent += `${lineNumber}|${rowData.tipoRegistro || 'N'}|` +
                `${rowData.plano || ''}|` +
                `${rowData.codigoBeneficiario || ''}|` +
                `${rowData.nomeCompleto || ''}|` +
                `${rowData.cpfBeneficiario || ''}|` +
                `${rowData.rgRneBeneficiario || ''}|` +
                `${rowData.orgaoExpedidor || ''}|` +
                `${rowData.nomeMae || ''}|` +
                `${rowData.dataNascimento || ''}|` +
                `${rowData.sexo || ''}|` +
                `${rowData.cns || ''}|` +
                `${rowData.estadoCivil || ''}|` +
                `${rowData.logradouro || ''}|` +
                `${rowData.numero || ''}|` +
                `${rowData.complemento || ''}|` +
                `${rowData.bairro || ''}|` +
                `${rowData.cidade || ''}|` +
                `${rowData.uf || ''}|` +
                `${rowData.cep || ''}|` +
                `${rowData.tipoTelefone1 || ''}|` +
                `${rowData.dddTelefone1 || ''}|` +
                `${rowData.telefone1 || ''}|` +
                `${rowData.ramalTelefone1 || ''}|` +
                `${rowData.tipoTelefone2 || ''}|` +
                `${rowData.dddTelefone2 || ''}|` +
                `${rowData.telefone2 || ''}|` +
                `${rowData.ramalTelefone2 || ''}|` +
                `${rowData.servidorPublico || ''}|` +
                `${rowData.tipoMovimentacao || ''}|` +
                `${rowData.valorMensalidade || ''}|` +
                `${rowData.dataOperacao || ''}|` +
                `${rowData.dataInicioVigencia || ''}|` +
                `${rowData.motivoCancelamento || ''}|` +
                `${rowData.formaPagamento || ''}|` +
                `${rowData.banco || ''}|` +
                `${rowData.agencia || ''}|` +
                `${rowData.contaCorrente || ''}|` +
                `${rowData.tipoConta || ''}|` +
                `${rowData.codigoVendedor || ''}|` +
                `${rowData.codigoGerente || ''}|` +
                `${rowData.codigoLoja || ''}|` +
                `${rowData.codigoRegional || ''}|` +
                `${rowData.contrato || ''}|` +
                `${rowData.locacao || ''}|` +
                `${rowData.email || ''}|` +
                `${rowData.diaCobranca || ''}|` +
                `${rowData.grauParentesco || ''}|` +
                `${rowData.vinculoCpfTitular || ''}|` +
                `${rowData.codigoBeneficiarioTitular || ''}|` +
                `${rowData.funcionalMatricula || ''}|` +
                `${rowData.centroCusto || ''}|` +
                `${rowData.carteirinha || ''}|` +
                `${rowData.naturezaDocumentoIdentificacao || ''}|` +
                `${rowData.dataExpedicao || ''}|` +
                `${rowData.passaporteCarteiraCivil || ''}|` +
                `${rowData.atividadePrincipalDesenvolvida || ''}|` +
                `${rowData.idRegistroRemessa || ''}|` +
                `${rowData.emBranco1 || ''}|` +
                `${rowData.emBranco2 || ''}|\n`;
        });
        
        // Rodapé (linha após o último registro)
        const lastLineNumber = spreadsheetData.length + 2;
        fileContent += `${lastLineNumber}|T|1|0|0|0|0|0|0|${lastLineNumber}`;
        
        output.textContent = fileContent;
        btnCopy.classList.remove('hidden');
        btnDownload.classList.remove('hidden');
        
        // Rolagem automática para a pré-visualização
        output.scrollIntoView({ behavior: 'smooth' });
    }

    // Funções auxiliares
    function formatDate(date) {
        const pad = num => num.toString().padStart(2, '0');
        return [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate()),
            pad(date.getHours()),
            pad(date.getMinutes()),
            pad(date.getSeconds())
        ].join('');
    }

    function downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Função para processar dados do Excel
    function processExcelData(event) {
        event.preventDefault();
        
        const clipboardData = event.clipboardData;
        const pastedData = clipboardData.getData('text');
        
        // Obter o campo onde o usuário está colando
        const targetInput = event.target;
        const targetFieldId = targetInput.dataset.fieldId;
        
        // Se for o campo sequencial, não permitir colagem
        if (targetFieldId === 'sequencialRegistro') {
            return;
        }
        
        // Dividir os dados em linhas e remover linhas vazias
        const rows = pastedData.split('\n')
            .map(row => row.trim())
            .filter(row => row !== '');
        
        // Pegar a linha atual
        let currentRow = targetInput.closest('tr');
        let rowIndex = parseInt(currentRow.dataset.rowId);
        
        // Para cada linha de dados
        rows.forEach((value, index) => {
            if (index === 0) {
                // Para a primeira linha, usar a linha atual
                targetInput.value = value;
                spreadsheetData[rowIndex][targetFieldId] = value;
            } else {
                // Para as próximas linhas, criar novas se necessário
                if (rowIndex + index >= spreadsheetData.length) {
                    addNewRow();
                }
                
                // Encontrar o input na linha correta
                const row = document.querySelector(`tr[data-row-id="${rowIndex + index}"]`);
                const input = row.querySelector(`input[data-field-id="${targetFieldId}"]`);
                
                // Atualizar o valor
                input.value = value;
                spreadsheetData[rowIndex + index][targetFieldId] = value;
            }
        });
    }

    // Event Listeners
    if (btnGenerate) {
    btnGenerate.addEventListener('click', generateFile);
    }

    if (btnAddRow) {
        btnAddRow.addEventListener('click', addNewRow);
    }

    btnCopy.addEventListener('click', function() {
        navigator.clipboard.writeText(output.textContent)
            .then(() => showAlert('Conteúdo copiado para a área de transferência!', 'success'))
            .catch(err => showAlert('Erro ao copiar o conteúdo', 'error'));
    });

    btnDownload.addEventListener('click', function() {
        const filename = `plano_saude_${formatDate(new Date())}.txt`;
        downloadFile(output.textContent, filename);
    });

    // Adicionar evento para colar dados do Excel
    sheetBody.addEventListener('paste', processExcelData);

    // Adicionar estilos necessários
    const style = document.createElement('style');
    style.textContent = `
        .select-wrapper {
            display: flex;
            align-items: center;
            width: 100%;
        }
        
        select.cell-input {
            width: auto;
            min-width: 60px;
            height: 100%;
            border: none;
            outline: none;
            padding: 4px;
            font-size: 13px;
            background-color: transparent;
            cursor: pointer;
        }
        
        select.cell-input:focus {
            background-color: #f0f9ff;
            box-shadow: inset 0 0 0 1px #90cdf4;
        }
        
        .select-description {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .header-select-wrapper {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .field-name {
            font-weight: 600;
        }
        
        .header-select {
            width: 100%;
            padding: 2px 4px;
            font-size: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            background-color: white;
            cursor: pointer;
        }
        
        .header-select:focus {
            outline: none;
            border-color: #90cdf4;
            box-shadow: 0 0 0 1px #90cdf4;
        }
        
        .cell-input[data-field-id="tipoRegistro"] {
            background-color: #f8f9fa;
        }
    `;
    document.head.appendChild(style);

    // Adicionar função para mostrar alertas estilizados
    function showAlert(message, type = 'success') {
        // Remover alerta anterior se existir
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Criar elemento do alerta
        const alert = document.createElement('div');
        alert.className = 'custom-alert fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50';
        
        // Definir cores baseadas no tipo
        if (type === 'success') {
            alert.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            alert.classList.add('bg-red-500', 'text-white');
        } else if (type === 'warning') {
            alert.classList.add('bg-yellow-500', 'text-white');
        }
        
        // Adicionar ícone baseado no tipo
        let icon = '';
        if (type === 'success') {
            icon = '✓';
        } else if (type === 'error') {
            icon = '✕';
        } else if (type === 'warning') {
            icon = '⚠';
        }
        
        // Criar conteúdo do alerta
        alert.innerHTML = `
            <div class="flex items-center">
                <span class="flex-shrink-0 mr-2">${icon}</span>
                <span class="flex-grow">${message}</span>
                <button class="ml-4 hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        
        // Adicionar ao documento
        document.body.appendChild(alert);
        
        // Animar entrada
        setTimeout(() => {
            alert.classList.add('translate-y-1');
        }, 10);
        
        // Remover após 3 segundos
        setTimeout(() => {
            alert.classList.add('opacity-0');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    // Adicionar estilos para os alertas
    const alertStyles = `
        .custom-alert {
            opacity: 1;
            transform: translateY(0);
        }
        
        .custom-alert.translate-y-1 {
            transform: translateY(1rem);
        }
        
        .custom-alert.opacity-0 {
            opacity: 0;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += alertStyles;

    // Adicionar estilos para o modal
    const modalStyles = `
        .confirm-modal {
            opacity: 0;
            transition: opacity 0.3s ease-out;
        }
        
        .confirm-modal.opacity-100 {
            opacity: 1;
        }
        
        .confirm-modal > div:last-child {
            opacity: 0;
            transform: translateY(-1rem);
            transition: all 0.3s ease-out;
        }
        
        .confirm-modal > div:last-child.opacity-100 {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // Adicionar os estilos ao elemento style existente
    style.textContent += modalStyles;

    // Criar botão de download do layout
    const btnDownloadLayout = document.createElement('button');
    btnDownloadLayout.className = 'ml-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors';
    btnDownloadLayout.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Layout do Arquivo
    `;

    // Adicionar tooltip
    btnDownloadLayout.title = 'Baixar arquivo de layout com instruções';

    // Adicionar evento de clique
    btnDownloadLayout.addEventListener('click', function() {
        const layoutFilePath = 'src/Layout Padrao Movimentação Cadastral.xlsx';
        
        fetch(layoutFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Arquivo não encontrado');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Layout Padrao Movimentação Cadastral.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                showAlert('Layout baixado com sucesso!', 'success');
            })
            .catch(error => {
                // Tentar caminho alternativo se o primeiro falhar
                const alternativePath = './src/Layout Padrao Movimentação Cadastral.xlsx';
                fetch(alternativePath)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Arquivo não encontrado');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Layout Padrao Movimentação Cadastral.xlsx';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                        
                        showAlert('Layout baixado com sucesso!', 'success');
                    })
                    .catch(err => {
                        console.error('Erro ao baixar o layout:', err);
                        showAlert('Erro ao baixar o layout. Por favor, verifique se o arquivo existe em src/Layout Padrao Movimentação Cadastral.xlsx', 'error');
                    });
            });
    });

    // Encontrar o título e criar um container flex
    const title = document.querySelector('h1');
    if (title) {
        // Criar um container flex para o título e o botão
        const headerContainer = document.createElement('div');
        headerContainer.className = 'flex items-center mb-4';
        
        // Mover o título para dentro do container
        title.parentNode.insertBefore(headerContainer, title);
        headerContainer.appendChild(title);
        
        // Adicionar o botão ao container
        headerContainer.appendChild(btnDownloadLayout);
    }

    // Adicionar estilos para o botão
    const layoutButtonStyles = `
        .header-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 640px) {
            .header-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
            
            .download-layout-btn {
                margin-left: 0;
                margin-top: 0.5rem;
            }
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += layoutButtonStyles;

    // Ajustar o estilo do container de saída para garantir que não haja sobreposição
    const outputStyles = `
        #output {
            margin-top: 4rem;
            padding-bottom: 5rem;
        }
    `;

    style.textContent += outputStyles;

    // Adicionar estilos específicos para o campo tipo de registro
    const tipoRegistroStyles = `
        .tipo-registro-input {
            text-transform: uppercase;
            font-weight: 600;
            text-align: center;
        }
        
        .tipo-registro-input:invalid {
            border-color: #ef4444;
            background-color: #fee2e2;
        }
        
        .tipo-registro-input:hover {
            cursor: help;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += tipoRegistroStyles;

    // Função para mostrar modal de escolha
    function showChoiceDialog(selectedValue, rowId, fieldId) {
        // Validar o valor selecionado
        if (!TIPOS_REGISTRO_VALIDOS.includes(selectedValue)) {
            showAlert('Tipo de registro inválido', 'error');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50"></div>
            <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 z-10">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Aplicar alteração</h3>
                <p class="text-sm text-gray-500 mb-6">Como você deseja aplicar esta alteração?</p>
                <div class="flex flex-col gap-3">
                    <button type="button" class="current-row-btn w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors text-left">
                        Apenas na próxima linha vazia
                    </button>
                    <button type="button" class="all-rows-btn w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-left">
                        Em todas as linhas
                    </button>
                    <button type="button" class="cancel-btn w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors text-left">
                        Cancelar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para os botões
        modal.querySelector('.current-row-btn').onclick = () => {
            // Aplicar apenas na próxima linha vazia
            const emptyRow = findFirstEmptyRow();
            if (emptyRow !== -1) {
                const input = document.querySelector(`tr[data-row-id="${emptyRow}"] input[data-field-id="${fieldId}"]`);
                if (input) {
                    input.value = selectedValue;
                    spreadsheetData[emptyRow][fieldId] = selectedValue;
                }
                showAlert('Alteração aplicada na próxima linha vazia', 'success');
            } else {
                // Se não encontrar linha vazia, criar uma nova
                addNewRowWithType(selectedValue);
                showAlert('Nova linha adicionada com o tipo selecionado', 'success');
            }
            modal.remove();
        };
        
        modal.querySelector('.all-rows-btn').onclick = () => {
            // Armazenar o tipo selecionado como padrão
            defaultTipoRegistro = selectedValue;
            
            // Aplicar em todas as linhas existentes
            spreadsheetData.forEach((data, index) => {
                data[fieldId] = selectedValue;
                const input = document.querySelector(`tr[data-row-id="${index}"] input[data-field-id="${fieldId}"]`);
                if (input) {
                    input.value = selectedValue;
                }
            });
            
            // Atualizar o select do cabeçalho para mostrar o valor selecionado
            const headerSelect = document.querySelector('.header-select');
            if (headerSelect) {
                headerSelect.value = selectedValue;
            }
            
            modal.remove();
            showAlert('Alteração aplicada em todas as linhas e será aplicada em novos registros', 'success');
        };
        
        modal.querySelector('.cancel-btn').onclick = () => {
            modal.remove();
        };
        
        // Fechar modal ao clicar no overlay
        modal.querySelector('.bg-black').onclick = () => {
            modal.remove();
        };
    }

    // Função auxiliar para encontrar a primeira linha vazia
    function findFirstEmptyRow() {
        return spreadsheetData.findIndex(data => !data.tipoRegistro);
    }

    // Função para adicionar nova linha com tipo específico
    function addNewRowWithType(selectedType) {
        const rowId = spreadsheetData.length;
        const rowData = {};
        
        fields.forEach(field => {
            if (field.id === 'tipoRegistro') {
                rowData[field.id] = selectedType;
            } else {
                rowData[field.id] = '';
            }
        });
        
        rowData.sequencialRegistro = (rowId + 1).toString();
        spreadsheetData.push(rowData);
        
        // Criar e adicionar nova linha à tabela
        addNewRow();
    }

    // Inicializar a planilha
    initSpreadsheet();
});