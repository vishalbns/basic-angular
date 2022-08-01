import {Component, ElementRef, EventEmitter, OnInit, ViewChild, Output, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 // @ViewChild('nameInput') nameInputRef: ElementRef;
 // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    onAddOrUpdateItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
      const value = form.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
      const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
      } else {
        this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClear();

  }
}
