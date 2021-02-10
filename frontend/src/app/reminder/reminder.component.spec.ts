import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailComponent } from './reminder.component';

describe('EmailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        EmailComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EmailComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MailerApp'`, () => {
    const fixture = TestBed.createComponent(EmailComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MailerApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(EmailComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('MailerApp app is running!');
  });
});
