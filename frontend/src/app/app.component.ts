import { Component } from '@angular/core';
import { MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  editorOptions = {theme: 'vs-light', language: 'plsql', readOnly: true};
  code: string = [
    '"use strict";',
    'function Person(age) {',
    '	if (age) {',
    '		this.age = age;',
    '	}',
    '}',
    'Person.prototype.getAge = function () {',
    '	return this.age;',
    '};'
  ].join('\n');

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$.pipe(
      filter(isLoaded => isLoaded),
      take(1),
    ).subscribe(() => {
        monaco.languages.register({ id: 'plsql' });

        monaco.languages.registerHoverProvider('plsql', {
        provideHover: function (model, position) {
          const range = new monaco.Range(3, 1, 3, 10);
          if (range.containsPosition(position)) {
            return {
              range,
              contents: [
                { value: '**SOURCE**' },
                { value: 'teste teste teste' }
              ]
            };
          }
          return null;
        }
      });
    });
   }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.deltaDecorations(
      [],
      [
        {
          range: new monaco.Range(3, 1, 3, 20),
          options: {
            inlineClassName: 'myInlineDecoration'
          }
        },
        {
          range: new monaco.Range(4, 1, 4, 10),
          options: { inlineClassName: 'myInlineDecoration' }
        }
      ]
    );
  }
}
