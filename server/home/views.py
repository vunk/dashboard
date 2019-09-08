from django.shortcuts import render
from django.http import HttpResponse


def index(request):
	#return HttpResponse('<table><tr>222<td>123</td></tr></table>')
	data = {
		'tt': '<table>123</table>'
	}
	return render(request, 'home/abc.html', data)

# Create your views here.
