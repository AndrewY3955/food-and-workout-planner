/**
 * Modal Forms System - Professional input dialogs
 * Replaces prompt() with proper HTML modals for v1.0.1 UX improvement
 */

const ModalSystem = {
    // Create modal overlay
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
        overlay.id = 'modal-overlay';
        overlay.addEventListener('click', () => this.closeModal());
        return overlay;
    },

    // Create modal container
    createModalContainer(title, content, buttons) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
        modal.id = 'modal-container';

        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg max-w-md w-full card-base p-6';

        // Header
        const header = document.createElement('h2');
        header.className = 'text-lg font-bold text-charcoal mb-4';
        header.textContent = title;

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'mb-6';
        contentDiv.appendChild(content);

        // Buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex gap-3 justify-end';
        buttons.forEach(btn => buttonContainer.appendChild(btn));

        card.appendChild(header);
        card.appendChild(contentDiv);
        card.appendChild(buttonContainer);
        modal.appendChild(card);

        return modal;
    },

    // Show modal
    showModal(modal) {
        const overlay = this.createOverlay();
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    },

    // Close modal
    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById('modal-container');
        if (overlay) overlay.remove();
        if (modal) modal.remove();
    },

    // Create input field
    createInputField(label, type = 'text', placeholder = '', value = '') {
        const container = document.createElement('div');
        container.className = 'mb-4';

        const labelEl = document.createElement('label');
        labelEl.className = 'block text-sm font-semibold text-charcoal mb-2';
        labelEl.textContent = label;

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = 'w-full border border-[#E8EAED] rounded px-3 py-2 text-sm focus:outline-none focus:border-mfp-blue';

        container.appendChild(labelEl);
        container.appendChild(input);

        return { container, input };
    },

    // Create select dropdown
    createSelectField(label, options, defaultValue = '') {
        const container = document.createElement('div');
        container.className = 'mb-4';

        const labelEl = document.createElement('label');
        labelEl.className = 'block text-sm font-semibold text-charcoal mb-2';
        labelEl.textContent = label;

        const select = document.createElement('select');
        select.className = 'w-full border border-[#E8EAED] rounded px-3 py-2 text-sm focus:outline-none focus:border-mfp-blue';

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            if (opt.value === defaultValue) option.selected = true;
            select.appendChild(option);
        });

        container.appendChild(labelEl);
        container.appendChild(select);

        return { container, select };
    },

    // Create button
    createButton(text, onClick, isPrimary = false) {
        const btn = document.createElement('button');
        if (isPrimary) {
            btn.className = 'btn-primary';
        } else {
            btn.className = 'px-4 py-2 border border-[#E8EAED] rounded text-sm font-medium hover:bg-gray-50';
        }
        btn.textContent = text;
        btn.addEventListener('click', onClick);
        return btn;
    },

    // Show Food Add Modal
    showFoodAddModal(mealType = 'breakfast') {
        const contentDiv = document.createElement('div');

        const { container: nameContainer, input: nameInput } = this.createInputField('Food Name *', 'text', 'e.g., Chicken Breast');
        const { container: caloriesContainer, input: caloriesInput } = this.createInputField('Calories *', 'number', 'e.g., 165');
        const { container: proteinContainer, input: proteinInput } = this.createInputField('Protein (g)', 'number', 'e.g., 31');
        const { container: carbsContainer, input: carbsInput } = this.createInputField('Carbs (g)', 'number', 'e.g., 0');
        const { container: fatsContainer, input: fatsInput } = this.createInputField('Fats (g)', 'number', 'e.g., 3.6');
        const { container: mealTypeContainer, select: mealTypeSelect } = this.createSelectField('Meal Type', [
            { value: 'breakfast', label: 'Breakfast' },
            { value: 'lunch', label: 'Lunch' },
            { value: 'dinner', label: 'Dinner' },
            { value: 'snacks', label: 'Snacks' }
        ], mealType);

        contentDiv.appendChild(nameContainer);
        contentDiv.appendChild(caloriesContainer);
        contentDiv.appendChild(proteinContainer);
        contentDiv.appendChild(carbsContainer);
        contentDiv.appendChild(fatsContainer);
        contentDiv.appendChild(mealTypeContainer);

        const cancelBtn = this.createButton('Cancel', () => this.closeModal());
        const saveBtn = this.createButton('Add Food', () => {
            // Validation
            if (!nameInput.value.trim()) {
                alert('Please enter a food name');
                return;
            }
            if (!caloriesInput.value || parseFloat(caloriesInput.value) < 0) {
                alert('Please enter valid calories');
                return;
            }

            const food = {
                name: nameInput.value.trim(),
                calories: parseFloat(caloriesInput.value),
                protein: parseFloat(proteinInput.value) || 0,
                carbs: parseFloat(carbsInput.value) || 0,
                fats: parseFloat(fatsInput.value) || 0
            };

            Storage.addFoodLog(food, mealTypeSelect.value);
            this.closeModal();
            Dashboard.instance.render();
        }, true);

        const modal = this.createModalContainer('Add Food Item', contentDiv, [cancelBtn, saveBtn]);
        this.showModal(modal);
    },

    // Show Workout Add Modal
    showWorkoutAddModal() {
        const contentDiv = document.createElement('div');

        const { container: exerciseContainer, input: exerciseInput } = this.createInputField('Exercise Name *', 'text', 'e.g., Bench Press');
        const { container: setContainer, input: setInput } = this.createInputField('Set #', 'number', 'e.g., 1');
        const { container: weightContainer, input: weightInput } = this.createInputField('Weight (lbs/kg) *', 'number', 'e.g., 225');
        const { container: repsContainer, input: repsInput } = this.createInputField('Reps *', 'number', 'e.g., 8');

        setInput.value = '1';

        contentDiv.appendChild(exerciseContainer);
        contentDiv.appendChild(setContainer);
        contentDiv.appendChild(weightContainer);
        contentDiv.appendChild(repsContainer);

        const cancelBtn = this.createButton('Cancel', () => this.closeModal());
        const saveBtn = this.createButton('Add Workout', () => {
            // Validation
            if (!exerciseInput.value.trim()) {
                alert('Please enter an exercise name');
                return;
            }
            if (!weightInput.value || parseFloat(weightInput.value) < 0) {
                alert('Please enter valid weight');
                return;
            }
            if (!repsInput.value || parseInt(repsInput.value) < 1) {
                alert('Please enter valid reps');
                return;
            }

            Storage.addWorkout(
                exerciseInput.value.trim(),
                parseInt(setInput.value) || 1,
                parseFloat(weightInput.value),
                parseInt(repsInput.value)
            );
            this.closeModal();
            Dashboard.instance.render();
        }, true);

        const modal = this.createModalContainer('Add Workout', contentDiv, [cancelBtn, saveBtn]);
        this.showModal(modal);
    },

    // Show Delete Confirmation
    showDeleteConfirmation(itemName, onConfirm) {
        const contentDiv = document.createElement('div');
        const msg = document.createElement('p');
        msg.className = 'text-sm text-charcoal';
        msg.textContent = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
        contentDiv.appendChild(msg);

        const cancelBtn = this.createButton('Cancel', () => this.closeModal());
        const deleteBtn = this.createButton('Delete', () => {
            onConfirm();
            this.closeModal();
        }, true);

        const modal = this.createModalContainer('Confirm Delete', contentDiv, [cancelBtn, deleteBtn]);
        this.showModal(modal);
    },

    // Show Settings Modal
    showSettingsModal() {
        const profile = Storage.getProfile();
        const contentDiv = document.createElement('div');

        const { container: nameContainer, input: nameInput } = this.createInputField('Name', 'text', 'User', profile.name);
        const { container: calorieGoalContainer, input: calorieGoalInput } = this.createInputField('Daily Calorie Goal *', 'number', '2000', profile.goalCalories);
        const { container: ageContainer, input: ageInput } = this.createInputField('Age', 'number', 'e.g., 30', profile.age);
        const { container: weightContainer, input: weightInput } = this.createInputField('Weight (lbs)', 'number', 'e.g., 180', profile.weight);
        const { container: heightContainer, input: heightInput } = this.createInputField('Height (inches)', 'number', 'e.g., 70', profile.height);

        contentDiv.appendChild(nameContainer);
        contentDiv.appendChild(calorieGoalContainer);
        contentDiv.appendChild(ageContainer);
        contentDiv.appendChild(weightContainer);
        contentDiv.appendChild(heightContainer);

        const cancelBtn = this.createButton('Cancel', () => this.closeModal());
        const saveBtn = this.createButton('Save', () => {
            if (!calorieGoalInput.value || parseFloat(calorieGoalInput.value) < 500) {
                alert('Please enter a valid calorie goal (minimum 500)');
                return;
            }

            Storage.updateProfile({
                name: nameInput.value || 'User',
                goalCalories: parseFloat(calorieGoalInput.value),
                age: parseInt(ageInput.value) || profile.age,
                weight: parseFloat(weightInput.value) || profile.weight,
                height: parseInt(heightInput.value) || profile.height
            });
            this.closeModal();
            Dashboard.instance.render();
        }, true);

        const modal = this.createModalContainer('Settings', contentDiv, [cancelBtn, saveBtn]);
        this.showModal(modal);
    }
};
