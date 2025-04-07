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
                
                // Evento de mudança para atualizar todas as linhas
                headerSelect.addEventListener('change', function() {
                    const selectedValue = this.value;
                    selectedTipoRegistro = selectedValue;
                    
                    // Atualizar todas as linhas com o valor selecionado
                    spreadsheetData.forEach((data, index) => {
                        data[field.id] = selectedValue;
                    });
                    // Atualizar todos os inputs nas linhas
                    document.querySelectorAll(`input[data-field-id="${field.id}"]`).forEach(input => {
                        input.value = selectedValue;
                    });
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
            if (field.id === 'tipoRegistro' && selectedTipoRegistro) {
                rowData[field.id] = selectedTipoRegistro;
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
        
        // Coluna de ações com botão de exclusão
        const actionCell = document.createElement('td');
        actionCell.className = 'row-actions p-2'; // Adicionar padding para área de clique maior
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button'; // Explicitar que é um botão
        deleteBtn.innerHTML = '✕';
        deleteBtn.className = 'delete-row-btn text-red-600 hover:text-red-800 text-sm p-2 rounded-full hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500';
        deleteBtn.title = 'Remover linha';
        
        // Adicionar o event listener diretamente com função anônima
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
            
            // Criar input para todos os campos (incluindo tipoRegistro)
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'cell-input';
            input.dataset.fieldId = field.id;
            input.dataset.rowId = rowId;
            input.placeholder = field.name;
            
            // Definir o valor inicial
            if (field.id === 'tipoRegistro' && selectedTipoRegistro) {
                input.value = selectedTipoRegistro;
            } else {
            input.value = rowData[field.id];
            }
            
            // Desabilitar edição do campo sequencialRegistro e tipoRegistro
            if (field.id === 'sequencialRegistro' || field.id === 'tipoRegistro') {
                input.disabled = true;
                input.classList.add('bg-gray-100');
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
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const nextCell = this.parentElement.nextElementSibling;
                    if (nextCell) {
                        const nextInput = nextCell.querySelector('.cell-input');
                        if (nextInput) nextInput.focus();
                    }
                }
                
                // Navegação com setas
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextCell = this.parentElement.nextElementSibling;
                    if (nextCell) {
                        const nextInput = nextCell.querySelector('.cell-input');
                        if (nextInput) nextInput.focus();
                    }
                }
                
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevCell = this.parentElement.previousElementSibling;
                    if (prevCell) {
                        const prevInput = prevCell.querySelector('.cell-input');
                        if (prevInput) prevInput.focus();
                    }
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextRow = this.closest('tr').nextElementSibling;
                    if (nextRow) {
                        const sameCellIndex = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement);
                        const inputs = nextRow.querySelectorAll('.cell-input');
                        if (inputs.length > sameCellIndex) {
                            inputs[sameCellIndex].focus();
                        }
                    }
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevRow = this.closest('tr').previousElementSibling;
                    if (prevRow) {
                        const sameCellIndex = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement);
                        const inputs = prevRow.querySelectorAll('.cell-input');
                        if (inputs.length > sameCellIndex) {
                            inputs[sameCellIndex].focus();
                        }
                    }
                }
            });
            
            cell.appendChild(input);
            row.appendChild(cell);
        });
        
        sheetBody.appendChild(row);
        
        // Focar no primeiro campo da nova linha
        const firstInput = row.querySelector('.cell-input');
        if (firstInput) firstInput.focus();
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

    // Inicializar a planilha
    initSpreadsheet();
});