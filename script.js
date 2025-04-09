document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a biblioteca XLSX está disponível
    if (typeof XLSX === 'undefined') {
        console.error('Biblioteca XLSX não encontrada. Verifique se o script foi carregado corretamente.');
        showAlert('Erro: Biblioteca XLSX não encontrada. Verifique se o script foi carregado corretamente.', 'error');
    } else {
        console.log('Biblioteca XLSX carregada com sucesso');
    }
    
    // Definição de todos os campos (apenas alguns exemplos - adicione todos)
    const fields = [
        { id: 'sequencialRegistro', name: 'Seq.Registro', description: 'Número sequencial do registro dentro do arquivo' },
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
        { id: 'plano', name: 'Plano', description: 'Código do plano adquirido pelo beneficiário' },
        { id: 'codigoBeneficiario', name: 'Cód.Benef.', description: 'Código do Beneficiário' },
        { id: 'nomeCompleto', name: 'Nome Completo', description: 'Nome do beneficiário' },
        { id: 'cpfBeneficiario', name: 'CPF do Beneficiário', description: 'CPF do beneficiário' },
        { id: 'rgRneBeneficiario', name: 'RG/RNE', description: 'Número do RG quando beneficiário maior de 18 anos' },
        { id: 'orgaoExpedidor', name: 'Órgão Exp.', description: 'Órgão expedidor do RG' },
        { id: 'nomeMae', name: 'Nome Mãe', description: 'Nome da mãe' },
        { id: 'dataNascimento', name: 'Dt.Nasc.', description: 'Formato DDMMAAAA' },
        { id: 'sexo', name: 'Sexo', description: 'Sexo' },
        { id: 'cns', name: 'CNS', description: 'Código do Cartão Nacional de Saúde' },
        { id: 'estadoCivil', name: 'Est.Civil', description: 'Estado Civil' },
        { id: 'logradouro', name: 'Logradouro', description: 'Endereço do beneficiário' },
        { id: 'numero', name: 'Número', description: 'Numero do endereço' },
        { id: 'complemento', name: 'Complemento', description: 'Complemento do endereço' },
        { id: 'bairro', name: 'Bairro', description: 'Bairro' },
        { id: 'cidade', name: 'Cidade', description: 'Cidade' },
        { id: 'uf', name: 'UF', description: 'Estado' },
        { id: 'cep', name: 'CEP', description: 'CEP' },
        { id: 'tipoTelefone1', name: 'Tipo Tel.1', description: 'Tipo de Telefone 1' },
        { id: 'dddTelefone1', name: 'DDD Tel.1', description: 'DDD do telefone 1' },
        { id: 'telefone1', name: 'Telefone 1', description: 'Número do telefone 1 (sem formatação)' },
        { id: 'ramalTelefone1', name: 'Ramal 1', description: 'Ramal do telefone 1' },
        { id: 'tipoTelefone2', name: 'Tipo Tel.2', description: 'Tipo de Telefone 2' },
        { id: 'dddTelefone2', name: 'DDD Tel.2', description: 'DDD do telefone 2' },
        { id: 'telefone2', name: 'Telefone 2', description: 'Número do telefone 2' },
        { id: 'ramalTelefone2', name: 'Ramal 2', description: 'Ramal do telefone 2' },
        { id: 'servidorPublico', name: 'Serv.Público', description: 'Servidor Público' },
        { id: 'tipoMovimentacao', name: 'Tipo Mov.', description: 'Tipo de Movimentação' },
        { id: 'valorMensalidade', name: 'Valor Mens.', description: 'Valor com 10 inteiros e 2 decimais' },
        { id: 'dataOperacao', name: 'Dt.Operação', description: 'Data da Operação' },
        { id: 'dataInicioVigencia', name: 'Dt.Início', description: 'Data de Inicio Vigência' },
        { id: 'motivoCancelamento', name: 'Motivo Canc.', description: 'Motivo de Cancelamento' },
        { id: 'formaPagamento', name: 'Forma Pag.', description: 'Forma de Pagamento' },
        { id: 'banco', name: 'Banco', description: 'Código do banco' },
        { id: 'agencia', name: 'Agência', description: 'Código da agência' },
        { id: 'contaCorrente', name: 'Conta', description: 'Número da conta + dígito' },
        { id: 'tipoConta', name: 'Tipo Conta', description: 'Tipo de Conta' },
        { id: 'codigoVendedor', name: 'Cód.Vendedor', description: 'Código do vendedor' },
        { id: 'codigoGerente', name: 'Cód.Gerente', description: 'Código do gerente' },
        { id: 'codigoLoja', name: 'Cód.Loja', description: 'Código da loja' },
        { id: 'codigoRegional', name: 'Cód.Regional', description: 'Código da regional' },
        { id: 'contrato', name: 'Contrato', description: 'Contrato do cliente' },
        { id: 'locacao', name: 'Locação', description: 'Locação' },
        { id: 'email', name: 'E-mail', description: 'E-mail' },
        { id: 'diaCobranca', name: 'Dia Cobr.', description: 'Dia do mês para cobrança' },
        { id: 'grauParentesco', name: 'Grau Parent.', description: 'Grau de parentesco' },
        { id: 'vinculoCpfTitular', name: 'CPF Titular', description: 'CPF do titular (sem formatação)' },
        { id: 'codigoBeneficiarioTitular', name: 'Cód.Ben.Titular', description: 'Código do beneficiário titular' },
        { id: 'funcionalMatricula', name: 'Func/Matrícula', description: 'Número de identificação no parceiro' },
        { id: 'centroCusto', name: 'Centro Custo', description: 'Centro de custo' },
        { id: 'carteirinha', name: 'Carteirinha', description: 'Número da carteirinha' },
        { id: 'naturezaDocumentoIdentificacao', name: 'Nat.Doc.ID', description: 'Tipo do documento' },
        { id: 'dataExpedicao', name: 'Dt.Expedição', description: 'Data de expedição do documento' },
        { id: 'passaporteCarteiraCivil', name: 'Passaporte', description: 'Passaporte ou carteira civil' },
        { id: 'atividadePrincipalDesenvolvida', name: 'Atividade', description: 'Atividade principal' },
        { id: 'informacaoAdicional1', name: 'Info.Adic.1', description: 'Campo adicional' },
        { id: 'informacaoAdicional2', name: 'Info.Adic.2', description: 'Campo adicional' },
        { id: 'informacaoAdicional3', name: 'Info.Adic.3', description: 'Campo adicional' }
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


    // Definições de validação para cada campo
    const FIELD_VALIDATIONS = {
        sequencialRegistro: {
            type: 'number',
            autoGenerated: true,
            required: true
        },
        tipoRegistro: {
            type: 'select',
            required: true,
            options: [
                { value: 'N', label: 'Nova Adesão Titular' },
                { value: 'C', label: 'Cancelamento' },
                { value: 'A', label: 'Alteração de Dados Cadastrais' },
                { value: 'U', label: 'Movimentação de Plano (Upgrade)' },
                { value: 'D', label: 'Novo Dependente' },
                { value: 'I', label: 'Inclusão de Dependente' },
                { value: 'E', label: 'Exclusão de Dependente' }
            ]
        },
        plano: {
            type: 'text',
            required: true
        },
        codigoBeneficiario: {
            type: 'text',
            required: true
        },
        nomeCompleto: {
            type: 'text',
            required: true,
            maxLength: 100
        },
        cpfBeneficiario: {
            type: 'cpf',
            required: (data) => calculateAge(data.dataNascimento) >= 18,
            mask: '000.000.000-00',
            unmask: true
        },
        rgRneBeneficiario: {
            type: 'text',
            required: (data) => calculateAge(data.dataNascimento) >= 18
        },
        orgaoExpedidor: {
            type: 'text',
            required: (data) => calculateAge(data.dataNascimento) >= 18
        },
        nomeMae: {
            type: 'text',
            required: true
        },
        dataNascimento: {
            type: 'date',
            required: true,
            format: 'DDMMAAAA',
            mask: '00/00/0000'
        },
        sexo: {
            type: 'select',
            required: true,
            options: [
                { value: '1', label: 'Masculino' },
                { value: '3', label: 'Feminino' }
            ]
        },
        cns: {
            type: 'text',
            required: false
        },
        estadoCivil: {
            type: 'select',
            required: true,
            options: [
                { value: '1', label: 'Casado' },
                { value: '2', label: 'Solteiro' },
                { value: '3', label: 'Divorciado' },
                { value: '4', label: 'Viúvo' },
                { value: '5', label: 'Separado' },
                { value: '6', label: 'Outros' }
            ]
        },
        // ... continuação das definições ...
    };

    // Definir as descrições dos tooltips para cada campo
    const FIELD_TOOLTIPS = {
        sequencialRegistro: 'Número sequencial do registro dentro do arquivo',
        tipoRegistro: 'Tipos válidos:\n' +
                     'N - Nova Adesão Titular\n' +
                     'C - Cancelamento\n' +
                     'A - Alteração de Dados Cadastrais\n' +
                     'U - Movimentação de Plano (Upgrade)\n' +
                     'D - Novo Dependente\n' +
                     'I - Inclusão de Dependente\n' +
                     'E - Exclusão de Dependente',
        plano: 'Código do plano adquirido pelo beneficiário',
        codigoBeneficiario: 'Código do Beneficiário',
        nomeCompleto: 'Nome do beneficiário',
        cpfBeneficiario: 'CPF do beneficiário (sem formatação)\nObrigatório se maior de 18 anos',
        rgRneBeneficiario: 'Número do RG (obrigatório se maior de 18 anos)',
        orgaoExpedidor: 'Órgão expedidor do RG',
        nomeMae: 'Nome da mãe',
        dataNascimento: 'Data de nascimento no formato DDMMAAAA\nExemplo: 25121990',
        sexo: 'Códigos válidos:\n1 - Masculino\n3 - Feminino',
        cns: 'Código do Cartão Nacional de Saúde',
        estadoCivil: 'Códigos válidos:\n' +
                    '1 - Casado\n' +
                    '2 - Solteiro\n' +
                    '3 - Divorciado\n' +
                    '4 - Viúvo\n' +
                    '5 - Separado\n' +
                    '6 - Outros',
        logradouro: 'Endereço do beneficiário',
        numero: 'Número do endereço',
        complemento: 'Complemento do endereço',
        bairro: 'Bairro',
        cidade: 'Cidade',
        uf: 'Estado',
        cep: 'CEP',
        tipoTelefone1: 'Códigos válidos:\n' +
                      '1 - Residência\n' +
                      '2 - Comercial\n' +
                      '3 - Celular',
        dddTelefone1: 'DDD do telefone 1',
        telefone1: 'Número do telefone 1 (sem formatação)',
        ramalTelefone1: 'Ramal do telefone 1',
        tipoTelefone2: 'Mesmo formato do Telefone 1',
        dddTelefone2: 'DDD do telefone 2',
        telefone2: 'Número do telefone 2',
        ramalTelefone2: 'Ramal do telefone 2',
        servidorPublico: 'Códigos válidos:\n1 - Pessoa Física\n2 - Servidor Público',
        tipoMovimentacao: 'Códigos válidos:\n1 - Normal\n2 - Retroativa',
        valorMensalidade: 'Valor com 10 inteiros e 2 decimais',
        dataOperacao: 'Data da operação no formato DDMMAAAA',
        dataInicioVigencia: 'Data de início da vigência no formato DDMMAAAA',
        motivoCancelamento: 'Códigos válidos:\n' +
                          '1 - Voluntário com Multa\n' +
                          '2 - Voluntário sem Multa\n' +
                          '3 - Inadimplência\n' +
                          '4 - Contratação Indevida\n' +
                          '5 - Demissão\n' +
                          '6 - Término Vigência\n' +
                          '7 - Particular',
        formaPagamento: 'Códigos válidos:\n' +
                       '1 - Débito\n' +
                       '2 - Cartão\n' +
                       '3 - Cartão PL\n' +
                       '4 - Boleto\n' +
                       '5 - Folha',
        banco: 'Código do banco',
        agencia: 'Código da agência',
        contaCorrente: 'Número da conta + dígito',
        tipoConta: 'Códigos válidos:\n1 - Corrente\n2 - Poupança',
        codigoVendedor: 'Código do vendedor',
        codigoGerente: 'Código do gerente',
        codigoLoja: 'Código da loja',
        codigoRegional: 'Código da regional',
        contrato: 'Contrato do cliente',
        locacao: 'Locação',
        email: 'E-mail',
        diaCobranca: 'Dia do mês para cobrança',
        grauParentesco: 'Códigos válidos:\n' +
                       '1 - Agregado\n' +
                       '2 - Cônjuge\n' +
                       '3 - Filho(a)\n' +
                       '4 - Mãe\n' +
                       '5 - Pai\n' +
                       '6 - Tio(a)\n' +
                       '7 - Enteado\n' +
                       '8 - Irmão(ã)\n' +
                       '9 - Avô(ó)',
        vinculoCpfTitular: 'CPF do titular (sem formatação)',
        codigoBeneficiarioTitular: 'Código do beneficiário titular',
        funcionalMatricula: 'Número de identificação no parceiro',
        centroCusto: 'Centro de custo',
        carteirinha: 'Número da carteirinha',
        naturezaDocumentoIdentificacao: 'Tipo do documento',
        dataExpedicao: 'Data de expedição do documento',
        passaporteCarteiraCivil: 'Passaporte ou carteira civil',
        atividadePrincipalDesenvolvida: 'Atividade principal',
        informacaoAdicional1: 'Campo adicional',
        informacaoAdicional2: 'Campo adicional',
        informacaoAdicional3: 'Campo adicional'
    };

    // Inicialização
    function initSpreadsheet() {
        // Adicionar campo de conta antes dos botões
        const headerDiv = document.querySelector('header > div:last-child');
        const accountContainer = document.createElement('div');
        accountContainer.className = 'flex items-center mr-4';
        accountContainer.innerHTML = `
            <div class="relative">
                <input type="text" 
                       id="accountNumber" 
                       class="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                       placeholder="Cod Conta"
                       style="width: 120px;">
                <div id="accountError" class="absolute text-red-500 text-xs mt-1 hidden">
                    Campo obrigatório
                </div>
            </div>
        `;
        
        headerDiv.insertBefore(accountContainer, headerDiv.firstChild);

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
        
        // Obter a data atual no formato DDMMAAAA
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        const dataAtual = `${dia}${mes}${ano}`;
        
        // Criar objeto para armazenar dados da linha
        fields.forEach(field => {
            if (field.id === 'tipoRegistro') {
                rowData[field.id] = defaultTipoRegistro || '';
            } else if (field.id === 'tipoMovimentacao') {
                rowData[field.id] = '1'; // Valor fixo para tipo de movimentação
            } else if (field.id === 'dataOperacao') {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                rowData[field.id] = `${day}${month}${year}`;
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
            
            // Adicionar tooltip
            input.title = FIELD_TOOLTIPS[field.id] || field.description;
            
            // Adicionar classes para estilização do tooltip
            input.classList.add('tooltip-input');
            
            // Definir o valor inicial e configurações específicas para cada campo
            if (field.id === 'tipoRegistro') {
                input.value = defaultTipoRegistro || '';
                input.maxLength = 1;
                
                // Adicionar validação para o campo tipo de registro
                input.addEventListener('input', function(e) {
                    let valor = e.target.value.toUpperCase();
                    
                    if (valor && !TIPOS_REGISTRO_VALIDOS.includes(valor)) {
                        showAlert('Tipo de registro inválido. Use apenas: ' + TIPOS_REGISTRO_VALIDOS.join(', '), 'error');
                        e.target.value = '';
                        const rowId = parseInt(e.target.dataset.rowId);
                        spreadsheetData[rowId][field.id] = '';
                        return;
                    }
                    
                    e.target.value = valor;
                    const rowId = parseInt(e.target.dataset.rowId);
                    spreadsheetData[rowId][field.id] = valor;
                });
                
                input.title = 'Valores válidos: ' + TIPOS_REGISTRO_VALIDOS.join(', ') + '\n' +
                             'N - Nova Adesão Titular\n' +
                             'C - Cancelamento\n' +
                             'A - Alteração de Dados Cadastrais\n' +
                             'U - Movimentação de Plano (Upgrade)\n' +
                             'D - Novo Dependente\n' +
                             'I - Inclusão de Dependente\n' +
                             'E - Exclusão de Dependente';
                
                input.classList.add('tipo-registro-input');
            } else if (field.id === 'sequencialRegistro') {
                input.value = rowData[field.id];
                input.disabled = true;
                input.classList.add('bg-gray-100');
            } else if (field.id === 'tipoMovimentacao') {
                input.value = '1';
                input.maxLength = 1;
                input.classList.add('tipo-movimentacao-input');
            } else if (field.id === 'dataOperacao') {
                input.value = dataAtual;
                input.maxLength = 8;
                input.classList.add('data-input');
            } else if (field.id === 'cpfBeneficiario') {
                input.value = rowData[field.id];
                
                // Adicionar validação para o campo CPF
                input.addEventListener('input', function(e) {
                    let valor = this.value.replace(/[^\d]/g, '');
                    valor = valor.substring(0, 11);
                    this.value = valor;
                    
                    if (valor.length === 11) {
                        if (!validateCPF(valor)) {
                            showAlert('CPF inválido!', 'error');
                            this.classList.add('invalid-cpf');
                        } else {
                            this.classList.remove('invalid-cpf');
                        }
                    }
                    
                    const rowId = parseInt(this.dataset.rowId);
                    spreadsheetData[rowId][field.id] = valor;
                });
                
                input.classList.add('cpf-input');
            } else {
                input.value = rowData[field.id];
            }
            
            // Adicionar eventos de foco e blur apenas para campos editáveis
            if (!input.disabled) {
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
            }
            
            cell.appendChild(input);
            row.appendChild(cell);
        });
        
        sheetBody.appendChild(row);
        
        // Focar no primeiro campo editável da nova linha
        const firstEditableInput = row.querySelector('input:not([disabled])');
        if (firstEditableInput) firstEditableInput.focus();
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
        // ... existing code ...
                        // Remover a validação de CPFs inválidos antes de gerar o arquivo
                        const accountNumber = document.getElementById('accountNumber')?.value?.trim();
                        const accountError = document.getElementById('accountError');
                        
                        if (!accountNumber) {
                            if (accountError) accountError.classList.remove('hidden');
                            showAlert('Por favor, preencha o número da conta da empresa', 'error');
                            document.getElementById('accountNumber')?.focus();
                            return;
                        }
                        
                        if (accountError) accountError.classList.add('hidden');

                        // Função para gerar o conteúdo do arquivo
                        function generateFileContent() {
                            let fileContent = '';
                            
                            // Remover resumo anterior se existir
                            const existingTotalsInfo = document.getElementById('totalsInfo');
                            if (existingTotalsInfo) {
                                existingTotalsInfo.remove();
                            }

                            // Contadores para cada tipo de registro
                            const totals = {
                                N: 0,
                                D: 0,
                                C: 0,
                                I: 0,
                                E: 0,
                                U: 0,
                                A: 0
                            };
                            
                            // Linha de cabeçalho
                            fileContent += `1|H|MOVIMENTACAO|${accountNumber}|${formatDate(new Date())}\n`;
                            
                            // Processar registros
                            spreadsheetData.forEach((rowData, index) => {
                                const lineNumber = index + 2;
                                const tipoRegistro = rowData.tipoRegistro || 'N';
                                
                                if (totals.hasOwnProperty(tipoRegistro)) {
                                    totals[tipoRegistro]++;
                                }

                                // Criar array com todos os 60 campos
                                const fields = [
                                    lineNumber,                                    // 1
                                    tipoRegistro,                                 // 2
                                    rowData.plano || '',                          // 3
                                    rowData.codigoBeneficiario || '',            // 4
                                    rowData.nomeCompleto || '',                   // 5
                                    rowData.cpfBeneficiario || '',               // 6
                                    rowData.rgRneBeneficiario || '',             // 7
                                    rowData.orgaoExpedidor || '',                // 8
                                    rowData.nomeMae || '',                       // 9
                                    rowData.dataNascimento || '',                // 10
                                    rowData.sexo || '',                          // 11
                                    rowData.cns || '',                           // 12
                                    rowData.estadoCivil || '',                   // 13
                                    rowData.logradouro || '',                    // 14
                                    rowData.numero || '',                        // 15
                                    rowData.complemento || '',                   // 16
                                    rowData.bairro || '',                       // 17
                                    rowData.cidade || '',                       // 18
                                    rowData.uf || '',                           // 19
                                    rowData.cep || '',                          // 20
                                    rowData.tipoTelefone1 || '',                // 21
                                    rowData.dddTelefone1 || '',                 // 22
                                    rowData.telefone1 || '',                    // 23
                                    rowData.ramalTelefone1 || '',               // 24
                                    rowData.tipoTelefone2 || '',                // 25
                                    rowData.dddTelefone2 || '',                 // 26
                                    rowData.telefone2 || '',                    // 27
                                    rowData.ramalTelefone2 || '',               // 28
                                    rowData.servidorPublico || '',              // 29
                                    rowData.tipoMovimentacao || '',             // 30
                                    rowData.valorMensalidade || '',             // 31
                                    rowData.dataOperacao || '',                 // 32
                                    rowData.dataInicioVigencia || '',           // 33
                                    rowData.motivoCancelamento || '',           // 34
                                    rowData.formaPagamento || '',               // 35
                                    rowData.banco || '',                        // 36
                                    rowData.agencia || '',                      // 37
                                    rowData.contaCorrente || '',                // 38
                                    rowData.tipoConta || '',                    // 39
                                    rowData.codigoVendedor || '',               // 40
                                    rowData.codigoGerente || '',                // 41
                                    rowData.codigoLoja || '',                   // 42
                                    rowData.codigoRegional || '',               // 43
                                    rowData.contrato || '',                     // 44
                                    rowData.locacao || '',                      // 45
                                    rowData.email || '',                        // 46
                                    rowData.diaCobranca || '',                  // 47
                                    rowData.grauParentesco || '',               // 48
                                    rowData.vinculoCpfTitular || '',            // 49
                                    rowData.codigoBeneficiarioTitular || '',    // 50
                                    rowData.funcionalMatricula || '',           // 51
                                    rowData.centroCusto || '',                  // 52
                                    rowData.carteirinha || '',                  // 53
                                    rowData.naturezaDocumentoIdentificacao || '', // 54
                                    rowData.dataExpedicao || '',                // 55
                                    rowData.passaporteCarteiraCivil || '',      // 56
                                    rowData.atividadePrincipalDesenvolvida || '', // 57
                                    rowData.informacaoAdicional1 || '',          // 58
                                    rowData.informacaoAdicional2 || '',          // 59
                                    rowData.informacaoAdicional3 || ''            // 60
                                ];

                                // Adicionar linha com exatamente 60 campos
                                fileContent += fields.join('|') + '\n';
                            });
                            
                            // Calcular total de registros (header + registros + trailer)
                            const totalRegistros = spreadsheetData.length + 2;
                            
                            // Adicionar linha de trailer
                            fileContent += `${totalRegistros}|T|` +
                                `${totals.N}|` +
                                `${totals.D}|` +
                                `${totals.C}|` +
                                `${totals.I}|` +
                                `${totals.E}|` +
                                `${totals.U}|` +
                                `${totals.A}|` +
                                `${totalRegistros}`;
                            
                            output.textContent = fileContent;
                            btnCopy.classList.remove('hidden');
                            btnDownload.classList.remove('hidden');
                            
                            // Criar elemento para mostrar os totais
                            const totalsInfo = document.createElement('div');
                            totalsInfo.id = 'totalsInfo'; // Adicionar ID para fácil referência
                            totalsInfo.className = 'mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200';
                            totalsInfo.innerHTML = `
                                <h3 class="text-sm font-semibold text-gray-700 mb-2">Resumo dos Registros</h3>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    ${Object.entries(totals).map(([tipo, total]) => `
                                        <div class="bg-white p-2 rounded shadow-sm">
                                            <div class="text-xs text-gray-500">Tipo ${tipo}</div>
                                            <div class="text-lg font-semibold">${total}</div>
                                        </div>
                                    `).join('')}
                                    <div class="bg-indigo-50 p-2 rounded shadow-sm">
                                        <div class="text-xs text-indigo-600">Total Geral</div>
                                        <div class="text-lg font-semibold">${totalRegistros}</div>
                                    </div>
                                </div>
                            `;

                            // Inserir o elemento de totais após o output
                            output.parentNode.insertBefore(totalsInfo, output.nextSibling);
                            
                            // Rolagem automática para a pré-visualização
                            output.scrollIntoView({ behavior: 'smooth' });
                        }
                        
                        // Iniciar a geração do arquivo
                        generateFileContent();
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
        
        // Gerar nome do arquivo com data e hora atual
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const formattedDate = `${year}${month}${day}_${hours}${minutes}${seconds}`;
        a.download = `movimentacao_cadastral_${formattedDate}.txt`;
        
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
        
        // Verificar se os dados contêm tabulações (múltiplos campos)
        if (pastedData.includes('\t')) {
            // Dividir os dados em linhas
            const rows = pastedData.split('\n')
                .map(row => row.trim())
                .filter(row => row !== '');
            
            // Para cada linha
            rows.forEach((row, rowIndex) => {
                // Dividir a linha em campos usando tabulação
                const fields = row.split('\t');
                
                // Pegar a linha atual ou criar uma nova
                let currentRowIndex = parseInt(this.closest('tr').dataset.rowId) + rowIndex;
                
                // Se precisar de mais linhas, adicionar
                while (currentRowIndex >= spreadsheetData.length) {
                    addNewRow();
                }
                
                // Para cada campo na linha
                fields.forEach((fieldValue, fieldIndex) => {
                    // Pegar o valor diretamente do campo correspondente
                    if (fieldValue !== undefined) {
                        const input = document.querySelector(`tr[data-row-id="${currentRowIndex}"] input[data-field-id="${fields[fieldIndex].id}"]`);
                        if (input) {
                            // Preservar valores dos campos tipoMovimentacao e dataOperacao
                            if (!(fields[fieldIndex].id === 'tipoMovimentacao' || fields[fieldIndex].id === 'dataOperacao')) {
                                input.value = fieldValue;
                                spreadsheetData[currentRowIndex][fields[fieldIndex].id] = fieldValue;
                            }
                        }
                    }
                });
            });
            
            return;
        }
        
        // Código original para dados sem tabulação
        // Dividir os dados em linhas e remover linhas vazias
        const rows = pastedData.split('\n')
            .map(row => row.trim())
            .filter(row => row !== '');
        
        // Pegar a linha atual
        let currentRow = this.closest('tr');
        let rowIndex = parseInt(currentRow.dataset.rowId);
        
        // Para cada linha de dados
        rows.forEach((value, index) => {
            // Se for a primeira linha, usar a linha atual
            if (index === 0) {
                this.value = value;
                spreadsheetData[rowIndex][field.id] = value;
            } else {
                // Para as próximas linhas, criar novas se necessário
                if (rowIndex + index >= spreadsheetData.length) {
                    addNewRow();
                }
                
                // Encontrar o input na linha correta
                const row = document.querySelector(`tr[data-row-id="${rowIndex + index}"]`);
                const input = row.querySelector(`input[data-field-id="${field.id}"]`);
                
                // Atualizar o valor
                input.value = value;
                spreadsheetData[rowIndex + index][field.id] = value;
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
        Download do Layout
    `;

    // Adicionar tooltip
    btnDownloadLayout.title = 'Baixar arquivo de layout com instruções';

    // Adicionar evento de clique
    btnDownloadLayout.addEventListener('click', function() {
        // Redirecionar para o link do Google Sheets
        window.open('https://docs.google.com/spreadsheets/d/1O-0UXFEwpq0MtPrtHT7a7lOZNVm3vRmX/edit?usp=drive_link&ouid=110128864082531091825&rtpof=true&sd=true', '_blank');
    });

    // Criar botão de layout vazio
    const btnEmptyLayout = document.createElement('button');
    btnEmptyLayout.className = 'ml-2 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors';
    btnEmptyLayout.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Layout Vazio
    `;

    // Adicionar tooltip
    btnEmptyLayout.title = 'Baixar arquivo de layout vazio';

    // Adicionar evento de clique
    btnEmptyLayout.addEventListener('click', function() {
        // Redirecionar para o link do Google Sheets
        window.open('https://docs.google.com/spreadsheets/d/11bHil0n7yBZsSnYxnNu5Lb5XSDMfAKyN/edit?usp=drive_link&ouid=110128864082531091825&rtpof=true&sd=true', '_blank');
    });

    // Criar botão de upload
    const btnUpload = document.createElement('button');
    btnUpload.className = 'ml-2 inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors';
    btnUpload.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        Fazer Upload
    `;

    // Adicionar tooltip
    btnUpload.title = 'Fazer upload de arquivo';

    // Adicionar evento de clique
    btnUpload.addEventListener('click', function() {
        console.log('Botão de upload clicado');
        
        // Criar um input de arquivo oculto
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx,.xls,.csv';
        fileInput.style.display = 'none';
        
        // Adicionar evento de mudança para processar o arquivo selecionado
        fileInput.addEventListener('change', function(e) {
            console.log('Arquivo selecionado:', e.target.files[0]);
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    console.log('Arquivo lido com sucesso');
                    try {
                        const data = new Uint8Array(event.target.result);
                        console.log('Dados do arquivo convertidos para Uint8Array');
                        
                        // Verificar se a biblioteca XLSX está disponível
                        if (typeof XLSX === 'undefined') {
                            console.error('Biblioteca XLSX não encontrada');
                            showAlert('Erro: Biblioteca XLSX não encontrada. Verifique se o script foi carregado corretamente.', 'error');
                            return;
                        }
                        
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // Converter para JSON com opções específicas
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                            header: 1,
                            raw: false,
                            defval: '',
                            blankrows: false
                        });
                        
                        // Verificar se há dados
                        if (jsonData.length === 0) {
                            showAlert('O arquivo não contém dados. Verifique se a planilha está preenchida.', 'error');
                            return;
                        }
                        
                        // Verificar se há dados suficientes
                        if (jsonData.length < 2) {
                            showAlert('O arquivo não contém dados suficientes. Verifique se há pelo menos um cabeçalho e uma linha de dados.', 'warning');
                            return;
                        }
                        
                        // Remover cabeçalho e pegar dados
                        const dataRows = jsonData.slice(1);
                        
                        // Limpar dados existentes
                        spreadsheetData = [];
                        sheetBody.innerHTML = '';
                        
                        // Para cada linha de dados
                        dataRows.forEach((row, index) => {
                            addNewRow();
                            fields.forEach((field, fieldIndex) => {
                                const value = row[fieldIndex];
                                if (value !== undefined) {
                                    const input = document.querySelector(`tr[data-row-id="${index}"] input[data-field-id="${field.id}"]`);
                                    if (input) {
                                        // Preservar valores dos campos tipoMovimentacao e dataOperacao
                                        if (!(field.id === 'tipoMovimentacao' || field.id === 'dataOperacao')) {
                                            input.value = value;
                                            spreadsheetData[index][field.id] = value;
                                        }
                                    }
                                }
                            });
                            
                            // Se o tipo de registro não foi preenchido, usar o valor padrão
                            if (!spreadsheetData[index].tipoRegistro && defaultTipoRegistro) {
                                spreadsheetData[index].tipoRegistro = defaultTipoRegistro;
                                const tipoRegistroInput = document.querySelector(`tr[data-row-id="${index}"] input[data-field-id="tipoRegistro"]`);
                                if (tipoRegistroInput) {
                                    tipoRegistroInput.value = defaultTipoRegistro;
                                }
                            }
                            
                            // Verificar se o tipo de registro é válido
                            const tipoRegistro = spreadsheetData[index].tipoRegistro;
                            if (tipoRegistro && !['N', 'C', 'A', 'U', 'D', 'I', 'E'].includes(tipoRegistro)) {
                                console.warn(`Tipo de registro inválido na linha ${index + 1}: ${tipoRegistro}`);
                                showAlert(`Atenção: Tipo de registro inválido na linha ${index + 1}: ${tipoRegistro}. Será usado o valor padrão.`, 'warning');
                                spreadsheetData[index].tipoRegistro = defaultTipoRegistro || 'N';
                                const tipoRegistroInput = document.querySelector(`tr[data-row-id="${index}"] input[data-field-id="tipoRegistro"]`);
                                if (tipoRegistroInput) {
                                    tipoRegistroInput.value = spreadsheetData[index].tipoRegistro;
                                }
                            }
                        });
                        
                        showAlert(`Arquivo importado com sucesso! ${dataRows.length} registros adicionados.`, 'success');
                    } catch (error) {
                        console.error('Erro ao processar arquivo:', error);
                        showAlert('Erro ao processar o arquivo: ' + error.message, 'error');
                    }
                };
                
                reader.onerror = function(error) {
                    console.error('Erro ao ler o arquivo:', error);
                    showAlert('Erro ao ler o arquivo: ' + error, 'error');
                };
                
                // Ler o arquivo como ArrayBuffer
                reader.readAsArrayBuffer(file);
            }
        });
        
        // Adicionar o input ao documento e clicar nele
        document.body.appendChild(fileInput);
        fileInput.click();
        
        // Remover o input após a seleção
        setTimeout(() => {
            document.body.removeChild(fileInput);
        }, 100);
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
        
        // Adicionar os botões ao container
        headerContainer.appendChild(btnDownloadLayout);
        headerContainer.appendChild(btnEmptyLayout);
        headerContainer.appendChild(btnUpload);
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

    // Adicionar estilos para os tooltips
    const tooltipStyles = `
        .tooltip-input {
            position: relative;
            cursor: help;
        }

        .tooltip-input:hover::after {
            content: attr(title);
            position: absolute;
            left: 0;
            top: -30px;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: pre-line;
            z-index: 1000;
            min-width: 200px;
            max-width: 300px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .tooltip-input:hover::before {
            content: '';
            position: absolute;
            left: 10px;
            top: -6px;
            border: 6px solid transparent;
            border-top-color: #333;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += tooltipStyles;

    // Adicionar estilos para CPFs inválidos
    const cpfStyles = `
        .invalid-cpf {
            background-color: #fee2e2 !important;
            border-color: #ef4444 !important;
        }
        
        .invalid-cpf:focus {
            box-shadow: 0 0 0 1px #ef4444 !important;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += cpfStyles;

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

    // Função para validar campo
    function validateField(fieldId, value, rowData) {
        const validation = FIELD_VALIDATIONS[fieldId];
        if (!validation) return true;

        // Verificar se é obrigatório
        if (validation.required) {
            if (typeof validation.required === 'function') {
                if (validation.required(rowData) && !value) return false;
            } else if (validation.required && !value) {
                return false;
            }
        }

        // Validar por tipo
        switch (validation.type) {
            case 'date':
                if (value) {
                    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}$/;
                    return dateRegex.test(value.replace(/\D/g, ''));
                }
                break;
            case 'select':
                if (value) {
                    return validation.options.some(opt => opt.value === value);
                }
                break;
        }

        return true;
    }

    // Função para aplicar máscara
    function applyMask(value, mask) {
        let masked = '';
        let valueIndex = 0;

        for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
            if (mask[i] === '0') {
                masked += value[valueIndex];
                valueIndex++;
            } else {
                masked += mask[i];
            }
        }

        return masked;
    }

    // Função para calcular idade
    function calculateAge(birthDate) {
        if (!birthDate) return 0;
        
        const parts = birthDate.replace(/\D/g, '').match(/(\d{2})(\d{2})(\d{4})/);
        if (!parts) return 0;
        
        const birth = new Date(parts[3], parts[2] - 1, parts[1]);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Adicionar evento para esconder a mensagem de erro quando o usuário começar a digitar
    document.getElementById('accountNumber')?.addEventListener('input', function() {
        document.getElementById('accountError')?.classList.add('hidden');
    });

    // Adicionar estilos para o novo campo
    const accountStyles = `
        #accountNumber:focus {
            border-color: #3b82f6;
        }
        
        #accountError {
            white-space: nowrap;
            font-size: 0.75rem;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += accountStyles;

    // Adicionar estilos para o resumo dos registros
    const totalsStyles = `
        .grid {
            display: grid;
        }
        
        @media (min-width: 768px) {
            .md\\:grid-cols-4 {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        .gap-3 {
            gap: 0.75rem;
        }
        
        .bg-indigo-50 {
            background-color: #eef2ff;
        }
        
        .text-indigo-600 {
            color: #4f46e5;
        }
        
        .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .font-semibold {
            font-weight: 600;
        }
    `;

    // Adicionar os novos estilos ao elemento style existente
    style.textContent += totalsStyles;

    // Inicializar a planilha
    initSpreadsheet();

    // Criar botão de limpar
    const btnClear = document.createElement('button');
    btnClear.className = 'ml-2 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors';
    btnClear.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
    `;

    // Adicionar tooltip
    btnClear.title = 'Limpar todos os dados';

    // Adicionar evento de clique
    btnClear.addEventListener('click', function() {
        showConfirmDialog('Tem certeza que deseja limpar todos os dados?', function() {
            // Limpar dados
            spreadsheetData = [];
            sheetBody.innerHTML = '';
            output.textContent = '';
            
            // Limpar número da conta
            const accountNumber = document.getElementById('accountNumber');
            if (accountNumber) {
                accountNumber.value = '';
            }
            
            // Esconder botões de copiar e download
            btnCopy.classList.add('hidden');
            btnDownload.classList.add('hidden');
            
            // Remover resumo se existir
            const totalsInfo = document.getElementById('totalsInfo');
            if (totalsInfo) {
                totalsInfo.remove();
            }
            
            // Adicionar uma linha inicial vazia
            addNewRow();
            
            showAlert('Todos os dados foram limpos com sucesso!', 'success');
        });
    });

    // Encontrar o container do header e adicionar o botão
    const headerContainer = document.querySelector('header > div:last-child');
    if (headerContainer) {
        headerContainer.appendChild(btnClear);
    }
});