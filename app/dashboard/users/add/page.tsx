import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateForm from '@/app/ui/posts/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Add Post',
            href: '/dashboard/posts/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}